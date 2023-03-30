const express = require("express")
const fs = require("fs")
const session = require('express-session')
const multer = require('multer')


const startDb = require("./database/init");
const userModel = require("./database/models/user");

const getFirstProductsControllers = require("./controllers/products/getFirstProducts");
const loadMoreProductsControllers = require("./controllers/products/loadMoreProducts");
const singleProductController = require("./controllers/products/singleProductDetail");

const createUserControllers = require("./controllers/user/createUser");
const verifyUserControllers = require("./controllers/user/verifyMail");




startDb();

const app = express();


app.use(express.static("public"));
app.use( express.static("uploads") );
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const upload = multer({ dest: "uploads" });

app.set('view engine', 'ejs');
app.set("views","./views");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
	
}))



app.route("/").get(getFirstProductsControllers);
app.route("/loadmore").get(loadMoreProductsControllers);
app.route("/singleProductDetail").post(singleProductController)




app.route("/verifyMail").get(function (req, res) {
	res.render("verifyMail",{email:req.session.currentuser.email ,message:""})
})
.post(verifyUserControllers)


app.route("/verify").get(async function (req, res)
{
	
	const temp_user = req.query.user;
	const temp_id = req.query.id;
	const user = await userModel.find({ username: temp_user });
	try {
		if (user[0]._id == temp_id) {
			const updateInfo = await userModel.findOneAndUpdate({ username: temp_user }, { $set: { isVerified: true } });
			req.session.destroy();
			res.render("success", { error: "" })
		}
	}
	catch(err)
	{
		res.render("success",{error:"Something happening wrong "});
	}
	
	
})




app.listen(3000, function()
{
	console.log("server is live")
})




app.route("/logout").get(function(req,res)
{ 
  req.session.destroy();
  res.redirect("/login");
})
.post(function (req, res)
{
	req.session.destroy();
	res.redirect("/login");
	
});



app.route("/login").get(function (req, res) {
	// res.sendFile(__dirname + "/public/html/login.html");
	res.render("login",{error : ""})
})
.post(function (req, res) {
	getUser(req.body.username,  req.body.password, function( err, user )
	{
		if(user.length)
		{
			req.session.isLoggedIn = true;
			// req.session.username = user[0].username;
			req.session.currentuser = user[0];
			
			res.redirect("/")
		}
		else
		{
			res.render("login",{ error:"Incorrect Username or password" });

		}
	});
});

app.route("/signup").get(function (req, res)
{
	// res.sendFile(__dirname+"/public/html/signup.html");
	res.render("signup",{error : ""})
})
.post(createUserControllers)




function saveUser(user, callback)
{
	userModel.create(user).then(function()
	{
		callback(null);
	})
	.catch(function()
	{
		callback("cannot save user")
	})
}

function getUser(username, password, callback)
{
	userModel.find({ username: username, password: password })
	.then(function(data)
	{
		callback(null, data)
	})
	.catch(function(err)
	{
		callback("user not found");
	})
}