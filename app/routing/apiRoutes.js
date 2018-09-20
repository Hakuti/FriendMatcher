module.exports = function(app) {
  var Data = [
    {
      Name: "Katie",
      Answers: [5, 2, 4, 1, 3, 2, 3, 1, 4, 5],
      PhotoUrl: ""
    },
    {
      Name: "Spongebob",
      Answers: [5, 2, 3, 1, 1, 5, 5, 5, 5, 5],
      PhotoUrl: ""
    },
    {
      Name: "Ashley",
      Answers: [2, 3, 4, 4, 4, 4, 3, 1, 3, 5],
      PhotoUrl: ""
    },
    {
      Name: "Carl",
      Answers: [3, 2, 4, 4, 4, 2, 3, 1, 5, 5],
      PhotoUrl: ""
    }
  ];

  var largestNumber = 0;
  var dataPushed = { Name: "Katie", Answers: [5, 2, 3, 1, 3] };
  var yourMatch;
  var compareArray = [];

  app.post("/friends", function(req, res) {
    //res.sendFile(path.join(__dirname, "./index.html"));
    var body = req.body;
    console.log(body);
    //var answers = [];
    //var name = req.body.Name;
    var answers = req.body.scores.map(Number);
    console.log(typeof answers[0]);
    // for (var i = 0; i < req.body.Answers; i++){
    //   answers
    // }
    //var answers = req.body.Answers;
    //console.log(JSON.parse(body));
    //console.log(answers);

    var dataPushed = { Name: req.body.name, Answers: answers };

    console.log(dataPushed);

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
    console.log(compareArray);
    res.json(yourMatch);
  });

  app.get("/api/friends", function(req, res) {
    console.log("Route hit");
    res.json(Data);
  });
  // var largestNumber = 0;
  // var dataPushed = { Name: "Katie", Answers: [5, 2, 3, 1, 3] };
  // var yourMatch;
  // var compareArray = [];

  //Calculate the difference
  // for (var i = 0; i < Data.length; i++) {
  //   if (dataPushed.Name == Data[i].Name) {
  //   } else {
  //     calculateDiff(dataPushed, Data[i]);
  //   }
  // }

  // //Calculate the largest number
  // for (let i = 0; i < compareArray.length; i++) {
  //   if (parseInt(compareArray[i].rate) > largestNumber) {
  //     largestNumber = parseInt(compareArray[i].rate);
  //     yourMatch = { Name: compareArray[i].name, rate: compareArray[i].rate };
  //   }
  // }

  //console.log(largestNumber);
  // console.log(yourMatch);
  // console.log(compareArray);

  //I want a list of all the people's and the number
  function calculateDiff(personAsking, personCompared) {
    let tempArray = [];
    for (var i = 0; i < personAsking.Answers.length; i++) {
      var result = Math.abs(
        personAsking.Answers[i] - personCompared.Answers[i]
      );
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
    //console.log(percentArray);
    for (let i = 0; i < percentArray.length; i++) {
      resultAddedSum = resultAddedSum + percentArray[i];
      //console.log(resultAddedSum);
    }
    //console.log(resultAddedSum);

    var totalResult = (resultAddedSum / 10) * 100;
    //console.log(totalResult);
    return totalResult;
    //console.log(totalResult.toPrecision(4));
  }
};
