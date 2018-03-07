

class TreeNode{

    constructor(value){
        this.value=value;
        this.children=[];
    }
}


/**
 * (递归地)把数组中以pid为祖先的节点转换为层级式的树形结构
 * @param {Array} list 
 * @param {Number} pid 
 */
function _listToTree(list,pid=null){
    const tree=list.filter(i=>i.pid==pid)
        .map(i=>new TreeNode(i))
    tree.forEach(node=>{
        const id=node.value.id;
        node.children=_listToTree(list,id);
    });
    return tree;
}

/**
 * 把整个数组转换为层级式树形结构（顶级节点为null）
 * @param {Array} list 
 */
function listToTree(list){
    return _listToTree(list,null);
}

/**
 * 获取数组中，某节点下的所有子孙节点的id所构成的列表
 * 注意，返回节点列表不包含函数参数指定的id(父节点)
 * @return {Array}
 */
function subnodeIdList(list,id){
    const sublist=list.filter(e=>e.pid==id);
    let ids=sublist.map(i=>i.id);
    sublist.forEach(e=>{
        const subids=subnodeIdList(list,e.id)
        ids=ids.concat(subids);
    })
    return ids;
}


module.exports={
    listToTree,
    subnodeIdList
};