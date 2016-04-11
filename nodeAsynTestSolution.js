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
    console.log("We have entered the results of the async series");
    console.log(err);
    console.log("These are the components");
    console.log(components);
  })
} catch(err) {
  console.log("The outer scope error");
  console.log(err);
}

// This first function is to illustrate the async series
function firstFunction(callback) {
  console.log("this is the first function");
  setTimeout(function() {
    callback(null, 'firstFunction was called');
  }, 0);
}


function secondFunction(callback) {

  var return_object = {
    results: [],
    errors: []
  }

  databaseConnection('some credentails', 'derp')
    .then(executeQuery)
    .then(manipulateResults)
    .then(cleanResults)
    .catch(function(err){
      console.log("This error occured in the promise chain: " + err);
      return_object.errors.push('Second function call broke');
      setTimeout(function() {
        callback(null, return_object);
      }, 0);
    });

  // connect to some database
  function databaseConnection(credentials, callback) {
    return new Promise(function(resolve, reject) {
      console.log("Started databaseConneciton")
      var connection = {
        name: "This is a databaseConnection object"
      }

      var resolve_object = {
        connection: connection,
        callback: callback
      }
      console.log(resolve_object);
      setTimeout(function(){
        resolve(resolve_object);
      }, 0);
    })
  }

  // invoke some query on the connection
  function executeQuery(connection) {
    return new Promise(function(resolve, reject){
      console.log("executing some queries")
      var  resolve_object = {
        connection: connection,
        callback: callback
      }
      var results = ['row1', 'row2']
      setTimeout(function(){
        resolve(resolve_object);
      }, 0);
    })
  }

  // Do things with the results
  function manipulateResults(results) {
    return new Promise(function(resolve, reject) {
      console.log("manipulating results");
      console.log(results);
      // this should move into the catch statement
      // console.log(breakingCall);
      setTimeout(function(){
        resolve(results)
      }, 0);
    });
  }

  // function won't be called simply comment out the above consolelog for this to resolve.
  function cleanResults(results) {
      console.log(results.connection);
      return_object.results.push('Everything went fine heres some results')
      setTimeout(function(){
        callback(null, 'some results from the second function');
      }, 0);
  }

}

function thirdFunction(callback) {
    console.log("this is the third function");
    console.log(catchThis);
    setTimeout(function(){
        callback('error from third function', 'thirdFunction was called');
    }, 0);
}