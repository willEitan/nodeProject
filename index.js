//consts 
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require ('express-handlebars')
const session = require('express-session')
const path = require('path')
const cnt = require("./controllers/controller.js")

//vars
//var PORT = process.env.PORT || 5000
var app = express()

//set handlebars engine
app.engine('handlebars', exphbs())
//uses
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
	secret : 'keyboard cat',
	resave : false,
	saveUninitialized: true
}))

//settings
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//get methods
app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/views/pages/reg.html')))
app.get('/ranNum', cnt.ranNum)
app.get('/weather', cnt.getWeather)
app.get('/tologin', (req, res) => res.sendFile(path.join(__dirname + '/views/pages/login.html')))
  
//post methods
app.post('/registerNewUser', cnt.register)
app.post('/login', cnt.login)
app.post('/verify', cnt.verify)
app.post('/updatePreferences', cnt.updatePreferences, cnt.sendWeather)

//listening
console.log("Starting")
//app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
