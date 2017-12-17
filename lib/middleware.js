const {message,toIntegerGreaterThan}=require('./helper');

function Middleware(service){


    return {

        /**
         * a create middleware
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         */
        create:function create(req,res,next){
            const {record,context}=req.body;
            return service.create(record)
                .then(_=>{
                    res.json(message.success());
                })
                .catch(e=>{
                    res.json(message.fail(e));
                });
        },

        remove:function remove(req,res,next){
            const {id,context}=req.body;
            if(!id){
                const m=message.fail('id required');
                res.json(m);
                return Promise.resolve(m);
            }
            return service.remove(id)
                .then(()=>{
                    res.json(message.success());
                })
                .catch(e=>{
                    res.json(message.fail(e));
                });
        },

        update:function update(req,res,next){
            let {id,record,context}=req.body;
            if(!id) {
                id= record ? record.id : undefined;
            }
            if(!id){
                const m=message.fail('id required');
                res.json(m);
                return Promise.resolve(m);
            }
            return service.update(id,record)
                .then(()=>{
                    res.json(message.success());
                })
                .catch(e=>{
                    res.json(message.fail(e));
                });
        },

        findById:function findById(req,res,next){
            let {id,}=req.body;
            if(!id){
                const m=message.fail('id required');
                res.json(m);
                return Promise.resolve(m);
            }
            return service.findById(id)
                .then((record)=>{
                    res.json(record);
                })
                .catch(e=>{
                    res.json(message.fail(e));
                    console.log(e);
                });
        },

        list:function list(req,res,next){
            
            let {page,size,condition,context}=req.body;
            page=toIntegerGreaterThan(page,0);
            size=toIntegerGreaterThan(size,0);
        
            return service.list(page,size,condition)
                .then((records)=>{
                    res.json(records);
                })
                .catch(e=>{
                    res.json(message.fail(e));
                    console.log(e);
                });
        },


        recent:function recent(req,res,next){
            
            let {page,size,condition,context}=req.body;
            page=toIntegerGreaterThan(page,0);
            size=toIntegerGreaterThan(size,0);
        
            return service.recent(page,size,condition)
                .then((records)=>{
                    res.json(records);
                })
                .catch(e=>{
                    res.json(message.fail(e));
                    console.log(e);
                });
        },

            
    };

};


module.exports=Middleware;