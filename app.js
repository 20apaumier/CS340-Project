/*
    SETUP for a simple web app
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
var path    = require('path');
PORT        = 33169;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./db-connector')
/*
    ROUTES
*/
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from 'public' directory

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/customers', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/customers.html'));
});

app.get('/gokarts', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/gokarts.html'));
});

app.get('/participants', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/participants.html'));
});

app.get('/races', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/races.html'));
});

app.get('/tracks', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/racks.html'));
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});