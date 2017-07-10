var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'antares',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);

router.get('/', function(req, res) {
  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      //GET tasks from the database
      var queryText = 'SELECT * FROM "tasks"';
      db.query(queryText, function(errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');

          res.sendStatus(500);
        } else {
          //console.log(result);
          //name array (arrayOfTasks) and send result to client
          res.send({
            arrayOfTasks: result.rows
          });
        }
      });
    }
  });
});

router.post('/', function(req, res) {
  console.log(req);
  var task = req.body;
  console.log(task);
  //error connecting is boolean, db is what we query against
  //done is a function that we can when we're done
  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      //we connected to the database!!!
      //Now we're going to GET things from the db
      var queryText = 'INSERT INTO tasks ("task", "complete")' + 'VALUES ($1, false);';
      // errorMakingQuery is a boolean, result is an object
      db.query(queryText, [task.task], function(errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          console.log(errorMakingQuery);
          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.sendStatus(200);
        }
      });
    }
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  console.log('Delete', id);
  //error connecting is boolean, db is what we query against
  //done is a function that we can when we're done
  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      //we connected to the database!!!
      //Now we're going to GET things from the db
      var queryText = 'DELETE FROM "tasks" WHERE id = $1';
      // errorMakingQuery is a boolean, result is an object
      db.query(queryText, [id], function(errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');

          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.sendStatus(200);
        }
      });
    }
  });
});

router.put('/:id', function(req, res) {
  console.log(req);
  var id = req.params.id;
  console.log(id);
  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      //we connected to the database!!!
      //Now we're going to GET things from the db
      var queryText = 'UPDATE "tasks" SET "complete" = true WHERE id =$1;';
      // errorMakingQuery is a boolean, result is an object
      db.query(queryText, [id], function(errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          console.log(errorMakingQuery);
          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
