const productList=require('../data.json').products
const byteStandards=require('../data.json').byteStandards

module.exports={
    queryProducts(req,res){
        res.json(productList)
    },
    queryByteStandards(req,res){
         
        res.json(byteStandards)
    }
}