const ProductModel = require("../../database/models/products");


module.exports = async function (id)
{   
    let data;
    try {
        data = await ProductModel.find({_id:id}); 
    }
    catch (err) {
        data = "Error occured in getting detail data "
    }
    
    return { data: data};
} 
   
