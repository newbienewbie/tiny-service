const Middleware=require('./middleware-base');



function CategoryMiddleware(service){
    const categoryMiddleware=Middleware(service);

    categoryMiddleware.listOfScope=function(req,res,next){
        const scope=req.params.scope?req.params.scope:"post";
        return service.listAll({ 'scope':scope })
            .then(list=>{ res.json(list); });
    }
    
    categoryMiddleware.treeOfScope=function(req,res,next){
        const scope=req.params.scope?req.params.scope:"post";
        return service.tree({ 'scope':scope })
            .then(list=>{ res.json(list); });
    }

    return categoryMiddleware;
};


module.exports=CategoryMiddleware;