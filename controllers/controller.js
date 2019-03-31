const model = require("../models/model.js")
const crypto = require('crypto')
const path = require('path')
const hashType = 'sha256'
var code = 0

register = (req, res) =>{
	console.log("registering new user, %s", req.body.name)
	req.session.password = crypto.createHash(hashType).update(req.body.password).digest('hex')
	req.session.email = req.body.email
	req.session.registeree = req.body.name

	model.ranNum(function(err, results){
		if (err) {
			throw err
		} else {
			let num = {
				code: results
			}
			code = results
			model.sendEmail(req.session.registeree, req.session.email, num, function(err, results){
				if (err){
					console.log(err)
					throw err
				} else {
					console.log(results)
					res.sendFile(path.join(__dirname, '../views/pages/verify.html'))
				}
			})
		}
	})
	
	
}

ranNum = (req, res) => {
	model.ranNum(function(err, results){
		if (err) {
			throw err
		} else {
			res.json(results)
		}
	})
	
}

getWeather = (req, res) => {
	//sends weather to html/ejs
}

login = (req, res) => {
	var user = {
		email : req.body.email,
		password : crypto.createHash(hashType).update(req.body.password).digest('hex')
	}
	model.findUser(user, function(err, results){
		if (err) {
			throw err
		} else {
			res.json(results)
		}
	})
}

verify = (req, res) => {
	var toCheck = req.body.code
	if (toCheck == code) {
		console.log("authenticated email")
		res.sendFile(path.join(__dirname, '../views/pages/updatePreferences.html'))
	} else {
		let msg = "incorrect number"
		res.sendFile(path.join(__dirname, '../views/pages/verify.html'), {msg : msg})
	}
}

updatePreferences = (req, res, next) => {
	req.session.city = req.body.city
	req.session.freq = req.body.frequency
	next()
}

sendWeather = (req, res) => {
	var city = req.session.city
	var email = req.session.email
	var registeree = req.session.registeree

	model.getWeather(city, function(err, weather_data) {
		if (err) {
			throw err
		} else {
			model.sendEmail(registeree, email, weather_data.weather, function(err, results) {
				if (err){
					throw err
				} else {
					res.json(results)
				}
			})
		}
	})
}

module.exports = {
	register : register,
	ranNum : ranNum,
	getWeather : getWeather,
	login : login,
	verify : verify,
	updatePreferences,
	sendWeather : sendWeather
}