/*
    SETUP for a simple web app
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
var path    = require('path');
var bodyParser = require('body-parser');
app.use(express.json());
PORT        = 33169;                 // Set a port number at the top so it's easy to change in the future
// Database
var pool = require('./db-connector')
/*
    ROUTES
*/
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from 'public' directory

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// CREATE
app.post('/customers', function(req, res) {
    var {name, age, contactInfo, racesCompleted, averageFinishPosition, firstPlaceFinishes} = req.body;
    var query = `INSERT INTO Customers (name, age, contactInfo, racesCompleted, averageFinishPosition, firstPlaceFinishes) VALUES (?, ?, ?, ?, ?, ?)`;
    pool.query(query, [name, age, contactInfo, racesCompleted, averageFinishPosition, firstPlaceFinishes], function(err, result) {
        if (err) {
            res.sendStatus(500);
            return console.log(err);
        }
        res.sendStatus(200);
    });
});

// READ
app.get('/customers', function(req, res) {
    var query = 'SELECT * FROM Customers';
    pool.query(query, function(err, result) {
        if (err) {
            res.sendStatus(500);
            return console.log(err);
        }
        res.json(result);
    });
});

// UPDATE
app.put('/customers/:id', function(req, res) {
    var data = req.body;
    var query = 'UPDATE Customers SET ';
    var params = [];

    for(var key in data) {
        query += `${key} = ?, `;
        params.push(data[key]);
    }

    query = query.slice(0, -2); // Remove the last comma
    query += ' WHERE customerID = ?';
    params.push(req.params.id);

    pool.query(query, params, function(err, result) {
        if (err) {
            res.sendStatus(500);
            return console.log(err);
        }
        res.sendStatus(200);
    });
});

// DELETE
app.delete('/customers/:id', function(req, res) {
    var query = `DELETE FROM Customers WHERE customerID = ?`;
    pool.query(query, [req.params.id], function(err, result) {
        if (err) {
            res.sendStatus(500);
            return console.log(err);
        }
        res.sendStatus(200);
    });
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