var session = require('express-session');
var FileStore = require('session-file-store')(session);

login = (req, res) => {
	let u = req.body.username
	let p = req.body.password
	console.log(u)
	console.log(p)
	if(u == "admin" && p == "password") {
		req.session.user = u
		
		var result = {
			success : true
		}
		res.json(result)
	} else {
		var result = {
			success : false
		}
		res.json(result)
	}
}

logout = (req, res) => {
	res.json("test")
}

getServerTime = (req, res) => {
	res.json("test")
}

module.exports = {
	login : login,
	logout : logout,
	getServerTime : getServerTime
}