// import env for encrypytion
require('dotenv').config();

// Get an instance of mysql we can use in the app
var mysql = require('mysql')


// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : `cs340_${process.env.USER}`,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DATABASE
})

// Export it for use in our application
module.exports = pool;