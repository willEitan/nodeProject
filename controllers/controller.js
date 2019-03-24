var model = require("../models/model.js")

register = (req, res) =>{
	//console.log("registering user")
	console.log(req.body)
	model.getWeather(req.body.city, function(weather_data) {
		res.json(weather_data)
	})
	
	/*const output = `
	<p>Please validate this email address with this 5-digit key</p>
	<p></p>`
*/
	
}

ranNum = (req, res) => {
	//generate a random 5-digit number
	var myNum = Math.floor(Math.random()*100000+1)
	//console.log(myNum)
	res.json(myNum)
}

getWeather = (req, res) => {
	
}

module.exports = {
	register : register,
	ranNum : ranNum,
	getWeather : getWeather
}