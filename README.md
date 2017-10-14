# tiny-service

a tiny service library for generate service functiions

## service usage

```js
const {Service} =require('tiny-Service');

// const model= ...;

const roleService=Service(model);
```

the shape of roleService is
```js
{

    /**
     * return the model itself
     * @return model
     */
    getModel:function(){ },

    /**
     * create model
     * @param record
     * @return {Promise<model>}
     */
    create:model.create,

    /**
     * remove model
     * @return {Promise<model>}
     */
    remove:function(id){ },

    /**
     * update model
     * @param {Integer} id model id
     * @return {Promise<model>} model 的JSON对象
     */
    update:function(id,record){ },


    /**
     * 根据ID查找
     * @param {Integer} id model id
     * @return {Promise<model>} model 的JSON对象
     */
    findById:function(id){ },


    /**
     * find and count all models by page ,size ,condition
     * @param {Number} page current page
     * @param {Number} size page size
     * @param {*} condition 
     * @return {Promise<{count:Number,rows:[]}>} 
     */
    list:function(page=1,size=10,condition={}){ },

    /**
     * list all recent models by page ,size ,condition, order by createdAt desc .
     * model must have a createAt field
     * @param {Number} page current page
     * @param {Number} size page size
     * @param {*} condition 
     * @return {Promise<{count:Number,rows:[]}>} 
     */
    recent:function(page=1,size=10,condition={}){ },

}
```

to override the default method of service , just rewrite it:
```js
roleService.list=function(page,size,condition){
    // implement 
};
```

## middleware usage

```js
const {Middleware}=require('tiny-service');

// ... const roleService= ...;
const middleware=Middleware(roleService);


const router=express.Router();
const middleware=Middleware(resourceService);


router.post('/create',bodyParser.json(),middleware.create);


router.post('/remove',bodyParser.json(),middleware.remove);


router.post('/update',bodyParser.json(),middleware.update);


router.post('/list',bodyParser.json(),middleware.list);


router.post('/recent',bodyParser.json(),middleware.recent);


module.exports=router;
```