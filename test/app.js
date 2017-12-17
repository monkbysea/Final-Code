const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser')
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': "5ab54552-1bf6-42dc-8dc8-0dd96e87dd3b",
  'password': "uB7Hyd2hh745",
  'version_date': '2017-02-27'
});

// io.on('connection', function (socket) {

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.post('/', function(req,res){
	var text=req.body.name
	// console.log("TEST", text)
	var parameters = {
	  'text': text,
	  'features': {
	    'entities': {
	      'emotion': true,
	      'sentiment': true,
	      'limit': 2
	    },
	    'keywords': {
	      'emotion': true,
	      'sentiment': true,
	      'limit': 2
	    }
	  }
	}

	natural_language_understanding.analyze(parameters, function(err, response) {
	  if (err){
	    console.log('error:', err);
	  } else {
	  	// console.log(JSON.stringify(response, null, 2));
		res.send(""+JSON.stringify(response, null, 2))
	  }
	});

})
io.on('connection', function (socket) {
	console.log("yes")

	socket.on('score', function (data) {
    console.log(data.a);
    

  });
});

