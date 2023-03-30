const mongoose = require('mongoose');

module.exports = function()
{
  mongoose.connect('mongodb+srv://sagar:sagar123@cluster0.odp4ric.mongodb.net/Ecomm?retryWrites=true&w=majority')
  .then(function()
  {
    console.log("connect to db")
  })
  .catch(function()
  {
    console.log("db connection error")
  })

}
