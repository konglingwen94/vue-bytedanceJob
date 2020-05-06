const data=require('../data.json').staffStories
module.exports={
    queryList(req,res){
         
        res.json(data)
    },
    queryOne(req,res){
        const id=parseInt(req.params.id)
        const result=data.find(item=>item.id===id)

        res.json(result)
    }
}