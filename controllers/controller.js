var model = require("../models/model.js")

register = (req, res) =>{
	console.log("registering user")
	console.log(req.body)
	var city = req.body.city
	model.getWeather(city, function(err, results) {
		if (err) {
			throw err
		} else {
			res.json(results)
		}
	})
	
	/*const output = `
	<p>Please validate this email address with this 5-digit key</p>
	<p></p>`
*/
	
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
	
}

module.exports = {
	register : register,
	ranNum : ranNum,
	getWeather : getWeather
}