var Promise = require('bluebird');
var eval = require('./evaluation.js');
var utils = require('./utilities.js');
var theta = require('./thetaComputation.js')

module.exports.evalForAllInputSizes = function(req, res, next) {
  var userInput = req.body.data;
  var dataType = req.params.dataType || null;

  Promise.resolve(
    eval.evalAlg(userInput, dataType)
  )
  .then(function(data) {
    var userInput = req.body.data;
    var userAlg = utils.memoBuild(userInput); 
   
    res.body = {}; 
    res.body.bigO = theta.computeTheta(userAlg, data);
    res.body.name = utils.getFuncName(userInput);
    res.body.eq = eval.runRegression(data, null);
    var coords = eval.getJSONCoords(data);
    res.body.coords = coords;

    next();
  });
};

module.exports.testAlgo = function(req, res, next) {
  var userInput = req.body.data;
  var testArray = [10,9,8,7,6,5,4,3,2,1];
  var ordArray = [1,2,3,4,5,6,7,8,9,10];
  var userAlg;

  // test if we can make function with it
  try {
    console.log('try - testing syntax');
    var param = userInput.slice(userInput.indexOf('(') + 1, userInput.indexOf(')'));
    var algString = userInput.slice(userInput.indexOf('{') + 1, userInput.lastIndexOf('}'));
    var userAlg = new Function(param, algString);
    if (!algString || !param) res.status(200).send("Error! No param or function body.");
  } catch(e) {
    if (e instanceof SyntaxError) {
      console.log('caught Syntax error, couldn\'t make function');
      console.log(e);
      res.send("Error! Your code has syntax errors.")
    }
    return;
  }

  // test if function runs
  try {
    console.log('try2 - testing executable');
    userAlg = utils.memoBuild(userInput);
    userAlg(testArray);
  } catch(e) {
    if (e instanceof SyntaxError) { 
      console.log('caught Syntax error, function didn\'t run');
      console.log(e);
      res.send("Error! That is not an executable function.")
    }
    return;
  }

  console.log('testing sort')
  var result = userAlg(testArray);

  if (result.join() === ordArray.join()) {
    console.log('alg passed');
    next();
  } else {
    res.send("Error! Your function doesn't sort.");
  }

};
