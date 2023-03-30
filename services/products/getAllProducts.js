const ProductModel = require("../../database/models/products");

var from = 0;
var loadmore = true;

module.exports = async function (page)
{   
    
    
    if (page)
    {
        from = 0;
    }

    let temp = from + 8;
    ProductModel.count({}, function (err, total) {
        
       
        if (total < temp)
        {
            loadmore = false; 
        }
       
    })  
    let start = from;
    from += 8;
  
    let data = await ProductModel.find({}).limit(8).skip(start);
    
    return { data: data, loadmore: loadmore };
} 
   
