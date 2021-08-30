var http = require("http");
var path = require("path");
var {MongoClient} = require('mongodb');
var url = "mongodb://pamarketServer:pamarket123@cluster0-shard-00-00.y46ut.mongodb.net:27017,cluster0-shard-00-01.y46ut.mongodb.net:27017,cluster0-shard-00-02.y46ut.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-tsv81h-shard-0&authSource=admin&retryWrites=true&w=majority";


var express = require("express");
var app = express();
const port = 4496;
app.listen(port);
const fs = require('fs');
const upload = require('express-fileupload');

const { send } = require("process");

var mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect();
app.use(upload());
app.use(express.static(__dirname));

app.get('/', (request,response)=>{
	
		response.sendFile(__dirname+"/Testing Page.html")
	
});


app.get('/get-all-farms', async(request,response)=>{
	
	try{
	
	var data = await mongoClient.db("Farm-Data").collection("Farm-Profiles").findOne({"name":"Farm-Profiles"});
	var packaged = data.body;
	response.send(JSON.stringify(packaged))
	
	}catch{
		response.send(JSON.stringify("Something went wrong"))
	}
	
});

app.get('/get-farm-crops/:id', async(request,response)=>{
	
	try{
	
	var farm = request.params.id;
	var data = await mongoClient.db("Farm-Data").collection("Farm-Profiles").findOne({"name":"Farm-Profiles"});
	
	var array = data.body;
	
	var target_farm = array.find((array)=>{
		
			return array['name'] === farm
		
	});
	
	
	var packaged = target_farm['crops'];
	response.send(JSON.stringify(packaged))
	
	}catch{
		response.send(JSON.stringify("Something went wrong"))
	}
	
});


app.get("/get-farm-photo/:id", async(request,response)=>{
	
		try{
	
	var farm = request.params.id;
	var data = await mongoClient.db("Farm-Data").collection("Farm-Profiles").findOne({"name":"Farm-Profiles"});
	
	var array = data.body;
	
	var target_farm = array.find((array)=>{
		
			return array['name'] === farm
		
	});
	
	
	var packaged = {"image-url":target_farm['photoUrl']};
	response.send(JSON.stringify(packaged))
	
	}catch{
		response.send(JSON.stringify("Something went wrong"))
	}
	
});