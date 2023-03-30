const UserModel = require("../../database/models/user");


module.exports = async function (req, res)
{
    
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isVerified: "false"
            
        } 
        try 
        {   

            var result = await UserModel.find({ username: user.username });
            if (result.length >=1 )
            {
                res.render("signup",{error :"User already exists" })
            }
               
            var result2 = await UserModel.find({ email: user.email })
            if (result2.length>=1)
            {
                res.render("signup",{error :"Email already exists" })
            }
            
            if(result.length ==0 && result2.length ==0)
            {
                await UserModel.create(user); 
                res.redirect("/login")
            }
            
            
        }
        catch (err)
        { 
            res.render("signup",{error :err })
        }
                 

    
 }
            
       
        
