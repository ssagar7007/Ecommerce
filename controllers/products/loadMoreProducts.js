const getAllProducts = require("../../services/products/getAllProducts");

module.exports = async function (req, res)
{
    if (!req.session.isLoggedIn)
    {
        res.redirect("/login");
        return
    }
    try
    {  
        
        const data = await getAllProducts();
       
            res.json({data:data.data,loadmore:data.loadmore});   
        
      
        
    }
    catch (err)
    {
        res.json("error occured in more products");
    }
   
   
}

