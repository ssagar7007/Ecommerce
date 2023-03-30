const getAllProducts = require("../../services/products/getAllProducts");

module.exports = async function (req, res)
{
    if (!req.session.isLoggedIn)
    {
        res.redirect("/login");
        return
    }
   
    const username = req.session.currentuser.username;
    const isVerified = req.session.currentuser.isVerified;

    try
    {   
        let loadmore = true;
        
        const data = await getAllProducts(true);
       
        if (data.loadmore)
        {
            loadmore = false;  
        }
        res.render("home",{ products : data.data ,loadmore:loadmore, username : username,isVerified:isVerified});
    }
    catch (err)
    {
        res.json("error occured in getting products");
    }
   
   
}

