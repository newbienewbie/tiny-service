const Service=require('../service-base');
const {listToTree,subnodeIdList }=require('./tree');

/**
 * 把 model 包装为 CategoryService
 * @param {*} model 
 */
function CategoryService(model){
    
    const service=Service(model);
    
    service.listAll=function listAll(condition={}){
        return domain.category.findAndCount({where:condition});
    };

    /**
     * 根据condition晒出一批category，然后从中选出以pid为祖先的节点，然后返回这些节点的id列表
     * condition可以用来指定scope等条件
     */
    service.getCategorySubnodeIdList=function(pid,condition={}){
        return domain.category.findAll({where:condition})
            .then(list=>{
                if(list){
                    return subnodeIdList(list,pid);
                }else{
                    return [];
                }
            });
    };

    /**
     * 获取分类树
     * @param {*} condition 
     */
    service.tree=function tree(condition={}){
        return domain.category.findAll({where:condition})
            .then(list=>listToTree(list));
    }
    
    return service;
};


module.exports=CategoryService;