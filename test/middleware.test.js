const assert=require('assert');
const Middleware=require('../lib/middleware');



/**
 * 利用一组函数，创建一个环境对象，其中的各函数在每次调用时都会在flags中进行计数。
 * 返回一个{flags:{},funcs:{}}
 * 用于检测函数的调用次数
 * @param {*} funcs 
 */
function funcBeenCalledEnv(funcs={'f':()=>{}}){
    const flags={ }; // 各函数的调用次数计数
    const new_funcs={};
    Object.keys(funcs).forEach(k=>{
        const f=funcs[k];
        flags[k]=0;
        new_funcs[k]=function(){
            flags[k]=flags[k]+1;  // 累加调用次数
            return f.apply(null,arguments); // 调用
        };
    });
    return { flags, funcs:new_funcs };
}

/**
 * fake service
 */
const service={
    getModel:function(){ 
        return Promise.resolve({});
    },
    create:function(record){
        return Promise.resolve(record);
    },
    remove:function(id){
        return Promise.resolve({id,});
    },
    update:function(id,record){
        return Promise.resolve(Object.assign({},record,{id}));
    },
    findById:function(id){
        return Promise.resolve({id,});
    },
    list:function(page=1,size=10,condition={}){
        return Promise.resolve([]);
    },
    recent:function(page=1,size=10,condition={}){
        return Promise.resolve([]);
    },
};


/**
 * fake res
 */
const res={
    json:function(obj){ 
        return JSON.stringify(obj );
    }
};

/**
 * fake req
 */
const req={
    body:{},
};

/**
 * fake next
 */
const next=()=>{};


describe('test #funcBeenCalledEnv()',function(){
it('test with fake service ( promise api)',function(){
    const {flags,funcs}=funcBeenCalledEnv(service);
    const promises=Object.keys(funcs).map(k=>{
        const f=funcs[k];
        return f().then(_=>{
            const count=flags[k];
            assert.ok(count,1,`function ${k} expected to be called just once`);
        })
    });
    return Promise.all(promises);
});

describe('test with fake res (sync api)',function(){
    it('test all api',function () {
        const {flags,funcs}=funcBeenCalledEnv(res);
        const list=Object.keys(funcs).map(k=>{
            const f=funcs[k];
            const result=f();
            const count=flags[k];
            assert.ok(count,1,`function ${k} expected to be called just once`);
        });
    });
    it('test fake res.json()',function () {
        const {flags,funcs}=funcBeenCalledEnv(res);
        const f=funcs['json'];
        const obj={id:1,foo:'bar'}
        const result=f(obj);
        const count=flags['json'];
        assert.ok(count,1,`function res.json() expected to be called just once`);
        assert.deepEqual(JSON.parse(result),obj,'should deep equal');
    });

});
});


describe('test middleware.js',function(){

    let serviceEnv=funcBeenCalledEnv(service);
    const serviceFlags=serviceEnv.flags;
    const serviceFunc=serviceEnv.funcs;
    const serviceCreate=serviceFunc.create;
    const serviceRemove=serviceFunc.remove;
    const serviceUpdate=serviceFunc.update;
    const serviceFindById=serviceFunc.findById;
    const serviceList=serviceFunc.list;
    const serviceRecent=serviceFunc.recent;

    const middleware=Middleware(serviceEnv.funcs);
    let middlewareEnv=funcBeenCalledEnv(middleware);
    const middlewareFlags=middlewareEnv.flags;
    const {create,remove,update,list,recent}=middlewareEnv.funcs;

    it('test #create()',function(){
        const record={};
        req.body={record,context:null};
        return create(req,res,next).then(_=>{
            assert.equal(middlewareFlags['create'],1,'理应恰好调用一次' ) ;
            assert.equal(serviceFlags['create'],1,'理应恰好调用1次');
        }).then(_=>{
            return create(req,res,next)
        }).then(_=>{
            assert.equal(middlewareFlags['create'],2,'理应恰好调用了2次' ) ;
            assert.equal(serviceFlags['create'],2,'理应恰好调用2次');
        });
    });

    it('test #remove()',function(){

        // when no id
        req.body={context:null};
        return remove(req,res,next).then(_=>{
            assert.equal(middlewareFlags['remove'],1,'middleware.remove()理应恰好调用1次' ) ;
            assert.equal(serviceFlags['remove'],0,'下伏service.remove()理应未发生调用');
        })
        // when given a body.id 
        .then(_=>{
            const id='fake';
            req.body={id,context:null};
            return remove(req,res,next)
        })
        .then(_=>{
            assert.equal(middlewareFlags['remove'],2,'理应恰好调用1次' ) ;
            assert.equal(serviceFlags['remove'],1,'理应恰好调用1次');
        });
    });

    it('test #update()',function(){
        // when no id
        const record={ }; // with no id provided
        req.body={record,context:null};
        return update(req,res,next).then(_=>{
            assert.equal(middlewareFlags['update'],1,'middleware.update()理应恰好调用1次' ) ;
            assert.equal(serviceFlags['update'],0,'下伏service.update()理应未发生调用');
        })
        // when given a body.id 
        .then(_=>{
            const record={}; // with no id provided
            req.body={id:'faked',record,context:null}; // with id privided here
            return update(req,res,next);        
        })
        .then(_=>{
            assert.equal(middlewareFlags['update'],2,'middleware.update理应恰好调用2次' ) ;
            assert.equal(serviceFlags['update'],1,'下伏service.update()理应恰好调用1次');
        })
        // when given body.record.id 
        .then(_=>{
            const record={ id:'fake', };
            req.body={record,context:null};
            return update(req,res,next) ;       
        })
        .then(_=>{
            assert.equal(middlewareFlags['update'],3,'middleware.update理应恰好调用3次' ) ;
            assert.equal(serviceFlags['update'],2,'下伏service.update()理应恰好调用2次');
        });
    });

    it('test #list()',function(){
        req.body={};
        return list(req,res,next).then(_=>{
            assert.equal(middlewareFlags['list'],1,'理应恰好调用1次' ) ;
            assert.equal(serviceFlags['list'],1,'理应恰好调用1次');
        });
    });
    it('test #recent()',function(){
        req.body={};
        return recent(req,res,next).then(_=>{
            assert.equal(middlewareFlags['recent'],1,'理应恰好调用1次' ) ;
            assert.equal(serviceFlags['recent'],1,'理应恰好调用1次');
        });
    });

});