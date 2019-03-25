const WAPIkey = 'f4cc2d8ac7fb9caec2899d69db657f61'
const connectionString = process.env.DATABASE_URL || "postgres://projectUser:nodeCS313@localhost:5432/project_02"
const { Pool } = require("pg")
const pool = new Pool({connectionString: connectionString})
const request = require('request')
const nodemailer = require('nodemailer')

sendEmail = (email, data, callback) => {
	console.log("Attempting to send email to %s", email)
	const output = `
		<p>The temperature in ${data.city} is: ${data.temperature}</p>`
	console.log("Email content is: %s", output)
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
	    host: "weatherregistry.epizy.com",
	    port: 587,
	    secure: false, // true for 465, false for other ports
	    auth: {
	      user: 'epiz_23662981', // generated ethereal user
	      pass: 'tbSq1JpUiNe' // generated ethereal password
	    },
	    tls:{
	    	rejectUnauthorized:false
	    }
	  });

	  // setup email data with unicode symbols
	  let mailOptions = {
	    from: '"Weather Report Registry" <weatherregistry@epizy.com>', // sender address
	    to: email, // list of receivers
	    subject: "Weather Report for " + data.city, // Subject line
	    text: "Your weather Report", // plain text body
	    html: output // html body
	  };

	  // send mail with defined transport object
	  //let info = await transporter.sendMail(mailOptions)
	  transporter.sendMail(mailOptions, (error, info) => {
	  	if (error){
	  		console.log(error)
	  		callback(error, null)
	  	} else {
	  		console.log("Message sent: %s", info.messageId);
	  		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	  		let message = "Email has been sent"
			callback(null, message)
	  	}
	  })


	  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	let message = "Email has been sent"
	callback(null, message)
}

getWeather = (city, callback) => {
	var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + WAPIkey
	
	request(url, function(error, response, body){
		weather_json = JSON.parse(body)
		console.log(weather_json)
		var weather = {
			city : city,
			temperature : Math.round(weather_json.main.temp),
			temp_min : Math.round(weather_json.main.temp_min),
			temp_max : Math.round(weather_json.main.temp_max),
			description : weather_json.weather[0].description,
			iocn : weather_json.weather[0].icon
		}
		var weather_data = {weather :weather}
		callback(null, weather_data)
	})
}

insertUserToDB = (user, callback) => {
	/*var name = req.query.name
	var email = req.query.email
	var password = req.query.password
	var type = req.query.type

	addSubscriberToDB(name, email, password, type, function(error, result) {
		if (error){
			console.log(error)
		} else {
			console.log("registered: " + result)
			res.json(result)
		}
	})*/
	var results = {
		test :test
	}
	callback(null, results)
}

addSubsciberToDB = (name, email, password, type, callback) => {
	console.log("registering new user " + name + " to database")
	
	var sql = "INSERT INTO subscibers (subscibers_id, name, email, password, subscription_type) VALUES (nextval(sb_seq), $1, $2, $3, $4)"
	var params = [name, email, password, type]

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("An error occured when accessing the database")
			consloe.log(err)
			callback(err, null)
		}
	})
}

findUser = (user, callback) => {
	console.log("finding user")
	//static result
	var results = {
		name : "John",
		password : "1234",
		city : "London"
	}

	callback(null)
}

ranNum = (callback) => {
	var myNum = Math.floor(Math.random()*90000 + 10000)
	callback(null, myNum)
}

module.exports = {
	sendEmail : sendEmail,
	getWeather : getWeather,
	addSubsciberToDB : addSubsciberToDB,
	findUser : findUser,
	ranNum : ranNum
}