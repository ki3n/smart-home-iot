/**
 * Created by ApurvaPatel on 10/17/15.
 */
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var http = require('http');

var usernames = {};
app.get('/light', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/control', function(req, res){
    res.sendFile(__dirname + '/control.html');
});

app.get('/coffee', function(req, res){
    res.sendFile(__dirname + '/coffee.html');
});

var io = require('socket.io').listen(app.listen(3002));
console.log('Listen to 3002');

var post_data = {
    'endpoint_name' : 607,
};

var post_options = {
    host: 'localhost',
    port: '8082',
    path: '/rest/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

// Set up the request
var post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
    });
});

// post the data
post_req.write(JSON.stringify(post_data));
post_req.end();

io.sockets.on('connection', function (socket) {

    socket.on('adduser', function (username) {

        console.log(username);

        MongoClient.connect("mongodb://apurvapatel1410:appumongodb14@ds041144.mongolab.com:41144/clientdb", function(err, db) {
            if(!err) {
                console.log("We are connected");
                var collection = db.collection('boot_info');
                collection.insert(username);

            }
        });

    });

    socket.on('adduser1', function (username) {

        console.log(username);

        MongoClient.connect("mongodb://apurvapatel1410:appumongodb14@ds041144.mongolab.com:41144/clientdb", function(err, db) {
            if(!err) {
                console.log("We are connected");
                var collection = db.collection('information');
                collection.insert(username);

            }
        });

    });
    socket.on('adduser2', function (username) {

        console.log(username);

        MongoClient.connect("mongodb://apurvapatel1410:appumongodb14@ds041144.mongolab.com:41144/clientdb", function(err, db) {
            if(!err) {
                console.log("We are connected");
                var collection = db.collection('temp');
                collection.insert(username);

            }
        });

    });

    socket.on('adduser3', function (username) {

        console.log(username);

        MongoClient.connect("mongodb://apurvapatel1410:appumongodb14@ds041144.mongolab.com:41144/clientdb", function(err, db) {
            if(!err) {
                console.log("We are connected");
                var collection = db.collection('location');
                collection.insert(username);

            }
        });

    });

    socket.on('adduser4', function (username) {

        console.log(username);

        MongoClient.connect("mongodb://apurvapatel1410:appumongodb14@ds041144.mongolab.com:41144/clientdb", function(err, db) {
            if(!err) {
                console.log("We are connected");
                var collection = db.collection('coffee');
                collection.insert(username);

            }
        });

    });

});
