const {deepcopy}=require('../helper');

/**
 * 把 model 包装为 service
 * @param {*} model 
 */
function Service(model){
    
    return {

        /**
         * return the model itself
         * @return model
         */
        getModel:function(){
            return model;
        },

        /**
         * create model
         * @param record
         * @return {Promise<model>}
         */
        create:function(record){
            return model.create(record);
        },

        /**
         * remove model
         * @return {Promise<model>}
         */
        remove:function(id){
            return model.destroy({ where:{id:id} });
        },

        /**
         * update model
         * @param {Integer} id model id
         * @return {Promise<model>} model 的JSON对象
         */
        update:function(id,record){
            const _record=deepcopy(record);
            delete _record.id;
            return model.update( _record, {where:{id}});
        },


        /**
         * 根据ID查找
         * @param {Integer} id model id
         * @return {Promise<model>} model 的JSON对象
         */
        findById:function(id){
            return model.findById(id)
        },


        /**
         * find and count all models by page ,size ,condition
         * @param {Number} page current page
         * @param {Number} size page size
         * @param {*} condition 
         * @return {Promise<{count:Number,rows:[]}>} 
         */
        list:function(page=1,size=10,condition={}){
            return model.findAndCount({
                offset:(page-1)*size,
                limit:size,
                where:condition
            });
        },

        /**
         * list all recent models by page ,size ,condition, order by createdAt desc .
         * model must have a createAt field
         * @param {Number} page current page
         * @param {Number} size page size
         * @param {*} condition 
         * @return {Promise<{count:Number,rows:[]}>} 
         */
        recent:function(page=1,size=10,condition={}){
            return model.findAndCount({
                limit:size,
                offset:(page-1)*size,
                where:condition,
                order:[['createdAt','desc']],
            });
        },

    };
};


module.exports=Service;