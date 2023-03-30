const userModel = require("../../database/models/user");
const createUserService = require("../../services/user/createUser")


module.exports = async function (req, res)
{
    
      
    // const user = { email: req.session.currentuser.email, subject: "Email Verfication", text: "Please verify" }
    const user = await userModel.find({ email: req.session.currentuser.email });
   
    
        try
        {   
            await createUserService(user[0],"Email verification Link",user[0]._id);  
            res.render("verifyMail",{email:user.email ,message:"Verification link has been sent"})
        }
        catch (err)
        {
            console.log(err);
        }
                 

    
}