const getSingleProductDetail = require("../../services/products/getSingleProductDetail");


module.exports = async function (req, res)
{   
    
    
    if (!req.session.isLoggedIn)
    {
        res.redirect("/login");
        return
    }
    
    try
    {  
        const data = await getSingleProductDetail(req.body.id);
        res.json({data:data.data});       
    }
    catch (err)
    {
        res.json("error occured in getting product detail");
    }
   
   
}

