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
            service.create(record)
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
                res.json(message.fail('id required'));
                return;
            }
            service.remove(id)
                .then(()=>{
                    res.json(message.success());
                })
                .catch(e=>{
                    res.json(message.fail(e));
                });
        },

        update:function update(req,res,next){
            const {record,context}=req.body;
            const {id}=record;
            if(!id){
                res.json(message.fail('id required'));
                return;
            }
            service.update(id,record)
                .then(()=>{
                    res.json(message.success());
                })
                .catch(e=>{
                    res.json(message.fail(e));
                });
        },


        list:function list(req,res,next){
            
            let {page,size,condition,context}=req.body;
            page=toIntegerGreaterThan(page,0);
            size=toIntegerGreaterThan(size,0);
        
            service.list(page,size,condition)
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
        
            service.recent(page,size,condition)
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