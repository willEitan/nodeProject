//consts 
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require ('express-handlebars')
const path = require('path')
const con = require("./controllers/controller.js")
//const PORT = process.env.PORT || 5000

//vars
var app = express()

//set handlebars engine
app.engine('handlebars', exphbs())
//uses
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
//settings
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
  
//get methods
app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/reg.html')))

app.get('/ranNum', con.ranNum)

//app.get('/weather', con.getWeather)
  
//post methods
app.post('/registerNewUser', con.register)

//listening
//app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.listen(process.env.PORT || 8000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
