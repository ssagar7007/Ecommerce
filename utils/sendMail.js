const nodemailer = require("nodemailer");

module.exports = async (user, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			
			service: 'gmail',
			port: 465,
			secure: true,
			auth: {
				user: 'ssagargupta7007@gmail.com',
				pass: 'uxpnmgmskvpibwov',
			},
		});

		await transporter.sendMail({
			from: 'ssagargupta7007@gmail.com',
			to: user.email,
			subject: subject,
		    html: '<h4>Hii '+ user.username +'<br>Please <a href="http://localhost:3000/verify/?id='+text+'&user='+user.username+'">Click Here</a> to verify your email account for Ecommerce. </h4>'
		});
		console.log("email sent successfully");
	} catch (error) {
		
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};

// const Mailjet = require('node-mailjet');

// const mailjet = new Mailjet({
//     apiKey: "2c90e4303f8064e398e99b36e13ff17e",
//     apiSecret:"9d8e01b8d2beb46a11f5ef31d91fed86"
// });



// module.exports.sendMail = async function (email,subject, body)
// {
       
// return await mailjet.post("send", {'version': 'v3.1'}).request({
//     "Messages":[
//         {
//         "From": {
//             "Email": "ssagargupta7007@gmail.com",
//             "Name": "Sagar"
//         },
//         "To": email,
//         "Subject": subject,
//         "HTMLPart": body,
//         }
//     ]
//     })
    

// }
    
