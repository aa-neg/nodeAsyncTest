var async = require("async");
var promise = require("promise");


try {
  async.series({
    componentOne: function(callback) {
      firstFunction(callback);
    },
    componentTwo: function(callback) {
      secondFunction(callback);
    },
    componentThree: function(callback) {
      thirdFunction(callback);
    }
  },
  function(err, components){
    console.log(err);
    console.log("These are the components")
    console.log(components);
  })
} catch(err) {
  console.log("The outer scope error");
  console.log(err);
}

// This first function is to illustrate the async series
function firstFunction(callback) {
  console.log("this is the first function");
  callback(null, 'firstFunction was called');
}


function secondFunction(callback) {

  var return_object = {
    results: [],
    errors: []
  }

  databaseConnection('some credentails')
    .then(executeQuery)
    .then(manipulateResults)
    .then(cleanResults)
    .catch(function(err){
      console.log("This error occured in the promise chain: " + err);
      return_object.errors.push('Second function call broke')
      callback(null, return_object);
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

  // function won't be called simply comment out the above consolelog for this to resolve.
  function cleanResults(results) {
    return new Promise(function(resolve, reject){
      resolve(results);
      return_object.results.push('Everything went fine heres some results')
      callback(null, return_object);
    })
  }

}

function thirdFunction(results) {
  console.log("this is the third function");
  callback(null, 'thirdFunction was called');
}