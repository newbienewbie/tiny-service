/**
 * deep copy a object
 * @param {*} obj 
 */
function deepcopy(obj){
    return JSON.parse(JSON.stringify(obj));
}


/**
 * parse s to integer that greater than gt
 * @param s {String} of int
 * @param gt {Number}
 * @return {Number}
 */
function toIntegerGreaterThan(s,gt=0){
    // parse int
    let result=parseInt(s);

    result= result>gt? result : (gt+1);
    return result;
}


/**
 * message generater
 */
const message={
    
    /**
     * generate succeess message
     */
    success:function success(){
        const info={ status:'SUCCESS',msg:'' };
        return info;
    },

    /**
     * generate fail message
     */
    fail: function fail(msg){
        const info={ status:'FAIL',msg };
        return info;
    },

    /**
     * generate info message
     */
    info: function(status,msg){
        const info ={status, msg };
        return info;
    },

};



module.exports={message,toIntegerGreaterThan,deepcopy};