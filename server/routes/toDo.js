var express = require('express');//*set up on creation of .js
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'antares', // name of your database
  host: 'localhost', // where is your database?
  port: 5432, // port for the database
  max: 10, // how many connections at one time?
  idleTimeoutMillis: 30000 // 30 second time out
};




module.exports = router;
