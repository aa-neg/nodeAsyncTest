var async = require("async");
var promise = require("promise");

try {
  async.series({
    firstCall: function(callback) {
      firstFunction(callback);
    },
    secondCall: function(callback) {
      secondFunction(callback);
    }
  },
  function(err, results){
    console.log(err);
    console.log("this is the results")
    console.log(results);
  })
} catch(err) {
  console.log("The outer scope error");
  console.log(err);
}

// This first function is to illustrate the async series
function firstFunction(callback) {
  console.log("this is the first function");
  callback(null, 'FirstFunction was called');
}


function secondFunction(callback) {

  databaseConnection('some credentails')
    .then(executeQuery)
    .then(manipulateResults)
    .then(cleanResults)
    .catch(function(err){
      console.log("This error occured in the promise chain: " + err);
      callback(null, 'Second function called');
    });

  // connect to some database
  function databaseConnection(credentials) {
    return new Promise(function(reoslve, reject) {
      var connection = {
        name: "This is a databaseConnection object"
      }
      resolve(connection);
    })
  }

  // invoke some query on the connection
  function executeQuery(connection) {
    return new Promise(function(resolve, reject){
      var results = ['row1', 'row2']
      resolve(results);
    })
  }

  // Do things with the results
  function manipulateResults(results) {
    return new Promise(function(resolve, reject) {
      // this should move into the catch statement
      console.log(breakingCall);
    })
  }

  function cleanResults(results) {
    return new Promise(function(resolve, reject){
      resolve(results);
    })
  }

}