const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/friends", function(req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

var Data = [
  {
    Name: "Katie",
    Answers: [5, 2, 4, 1, 3]
  },
  {
    Name: "Spongebob",
    Answers: [5, 2, 3, 1, 1]
  },
  {
    Name: "Ashley",
    Answers: [2, 3, 4, 4, 4]
  },
  {
    Name: "Carl",
    Answers: [3, 2, 4, 4, 4]
  }
];

var largestNumber = 0;
var dataPushed = { Name: "Katie", Answers: [5, 2, 3, 1, 3] };
var yourMatch;
var compareArray = [];

//Calculate the difference
for (var i = 0; i < Data.length; i++) {
  if (dataPushed.Name == Data[i].Name) {
  } else {
    calculateDiff(dataPushed, Data[i]);
  }
}

//Calculate the largest number
for (let i = 0; i < compareArray.length; i++) {
  if (parseInt(compareArray[i].rate) > largestNumber) {
    largestNumber = parseInt(compareArray[i].rate);
    yourMatch = { Name: compareArray[i].name, rate: compareArray[i].rate };
  }
}

//console.log(largestNumber);
console.log(yourMatch);
console.log(compareArray);

//I want a list of all the people's and the number
function calculateDiff(personAsking, personCompared) {
  let tempArray = [];
  for (var i = 0; i < personAsking.Answers.length; i++) {
    var result = Math.abs(personAsking.Answers[i] - personCompared.Answers[i]);
    // console.log("This result: " + result);
    var newResult = runPercentageFormula(result);
    tempArray.push(newResult);
  }
  var compabilityRate = addPercentageTogether(tempArray);
  compareArray.push({ name: personCompared.Name, rate: compabilityRate });

  //   console.log(compabilityRate);
}

function runPercentageFormula(result) {
  if (result == 0) {
    return 1;
  } else if (result == 1) {
    return 0.8;
  } else if (result == 2) {
    return 0.6;
  } else if (result == 3) {
    return 0.4;
  } else if (result == 4) {
    return 0.2;
  } else if (result == 5) {
    return 0;
  }
}

function addPercentageTogether(percentArray) {
  //add all the numbers
  //divide by 5
  var resultAddedSum = 0;
  for (let i = 0; i < percentArray.length; i++) {
    resultAddedSum = resultAddedSum + percentArray[i];
  }
  var totalResult = (resultAddedSum / 5) * 100;
  return totalResult.toPrecision(2);
  console.log(totalResult.toPrecision(2));
}

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
