// Base s	etup
// ===========================================================================================================

// call the packages we need
var express = require("express");
var app = express();				//Created express object
var mongoose   = require('mongoose');		//Importing mongoose for object Data modeling
mongoose.connect('mongodb://127.0.0.1:27017/bear');		//Connecting to MongoDB
var Bear = require('./app/models/bear')
// var events = require("events");

var bodyParser = require("body-parser");

// Tell express about middleware "body-parser" to get POST data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Setup port
var port = process.env.PORT || 8080

// Routing for our app
// ===========================================================================================================
var router = express.Router();		//get an instance of express router

// middleware to use all requests | this accepts all requests and next() forwards them to the other routes
router.use(function(req,res,next){
	console.log("Request came in!!");
	next();
});

// Test get link
router.get('/',function(req,res){
	res.json({message:"API server working!!"});
	// events.EventEmitter()
});

// Route 1
router.post('/sendsentence',function(req,res){
	var bear = new Bear();
	bear.name = req.body.name;		//Getting Post body data
	bear.save(function(err){
		if (err) {
			res.send("error");
		}
		res.json({message:"Bear created!"});
		console.log(req.body.name+" bear created!");
	});
});

// Route2
router.post('/recievetranslation',function(req,res){
	var bear = new Bear();
	bear.name = req.body.name;		//Getting Post body data
	bear.save(function(err){
		if (err) {
			res.send("error");
		}
		res.json({message:"Bear created!"});
		console.log(req.body.name+" bear created!");
	});
});

// Route3
router.post('/getalldata',function(req,res){
	var bear = new Bear();
	bear.name = req.body.name;		//Getting Post body data
	bear.save(function(err){
		if (err) {
			res.send("error");
		}
		res.json({message:"Bear created!"});
		console.log(req.body.name+" bear created!");
	});
});

// Route4
router.post('/gettsne',function(req,res){
	var bear = new Bear();
	bear.name = req.body.name;		//Getting Post body data
	bear.save(function(err){
		if (err) {
			res.send("error");
		}
		res.json({message:"Bear created!"});
		console.log(req.body.name+" bear created!");
	});
});

// More routes here............

// Route registration--------------
// all our routes will be prfixed by "/api"
app.use('/api',router);

// START SERVER
// ============================================================================================================
app.listen(port);
console.log("Port "+ port +" listening for requests");
