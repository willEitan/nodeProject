const WAPIkey = ''
const connectionString = process.env.DATABASE_URL || "postgres://projectUser:nodeCS313@localhost:5432/project_02"
const { Pool } = require("pg")
const pool = new Pool({connectionString: connectionString})
const request = require('request')
const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')

sendEmail = (user, email, data, callback) => {
	console.log("Attempting to send email to %s with email %s", user, email)
	console.log("Using data: " + data)
	
	var output = ''
	var subject = ''
	if (data.city){
		output = `<h3>${user},</h3><em>In ${data.city} \"${data.description}\" </em><p>With a high of ${data.temp_hign}°F and a low of ${data.temp_low}°F, the temperature in ${data.city} is: ${data.temperature}°F</p>`
		subject = 'Weather Report for ' + data.city
	} else {
		output = `<h3>${user},</h3><p>Verify your Weather Registry email with this 5-digit authentication code: </p>
					<b>${data.code}</b>
					<p>Code will expire in 30 minutes.</p>`
		subject = 'Thanks for signing up! Stay informed'
	}

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			type: 'OAuth2',
			user: 'yourWeatherUpdater@gmail.com',
			clientId: '',
			clientSecret: '',
			refreshToken: '',
			accessToken: ''
		}
	})
	  // setup email data with unicode symbols
	  let mailOptions = {
	    from: "'Weather Report Registry' <yourWeatherUpdater@gmail.com>", // sender address
	    to: email, // list of receivers
	    subject: subject, // Subject line
	    text: "Your Weather Report", // plain text body
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
}

getWeather = (city, callback) => {
	console.log("making api call for weather in %s", city)
	var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + WAPIkey
	console.log("using url: %s", url)
	request(url, function(error, response, body){
		if (error) {
			console.log(error)
			callback(error, null)
		} else {
			weather_json = JSON.parse(body)
			console.log("parsed: " + weather_json)
			var weather = {
				city : city,
				temperature : Math.round(weather_json.main.temp),
				temp_low : Math.round(weather_json.main.temp_min),
				temp_high : Math.round(weather_json.main.temp_max),
				description : weather_json.weather[0].description,
				iocn : weather_json.weather[0].icon
			}
			var weather_data = {weather : weather}
			callback(null, weather_data)
		}
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
	console.log("Inserting new user " + name + " to database")
	
	var sql = "INSERT INTO subscibers (subscibers_id, name, email, password, subscription_type) VALUES (nextval(sb_seq), $1, $2, $3, $4)"
	var params = [name, email, password, type]

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("An error occured when accessing the database")
			consloe.log(err)
			callback(err, null)
		} else {

		}
	})
}

findUser = (user, callback) => {
	console.log("finding user")
	//static result
	var results = {
		name : "John",
		email : "john@mail.com",
		password : "1234",
		city : "London"
	}

	callback(null, results)
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
