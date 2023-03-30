// const UserModel = require("../../database/models/user");
const sendMail = require("../../utils/sendMail");

module.exports = async function (user,subject,text)
{
    // const updatedUser = await UserModel.create(user);
   
    await sendMail(
        user,
        subject,
        text);
    return;
}
