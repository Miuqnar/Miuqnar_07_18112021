const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host:     process.env.DBHOST,
    user:     process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNETWORK,
});

connection.connect (error => {
    if (error) throw error;
    console.log ('connected database');
});

module.exports = connection;