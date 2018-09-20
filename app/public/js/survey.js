// Capture the form inputs
$(document).ready(function() {
  console.log("JsFile");
  $("#submit").on("click", function(event) {
    event.preventDefault();
    console.log("This click");
    let isTrue = false;
    // Form validation
    function validateForm() {
      if (!$("#photoInput").val()) {
        isTrue = false;
      } else {
        isTrue = true;
      }
      if (!$("#nameInput").val()) {
        isTrue = false;
      } else {
        isTrue = true;
      }
      for (let i = 1; i < 10; i++) {
        if (!$("#q" + i).val()) {
          isTrue = false;
        } else {
          isTrue = true;
        }
      }

      return isTrue;
    }

    // If all required fields are filled
    if (validateForm()) {
      // Create an object for the user"s data
      var userData = {
        name: $("#name").val(),
        photo: $("#photo").val(),
        scores: [
          $("#q1").val(),
          $("#q2").val(),
          $("#q3").val(),
          $("#q4").val(),
          $("#q5").val(),
          $("#q6").val(),
          $("#q7").val(),
          $("#q8").val(),
          $("#q9").val(),
          $("#q10").val()
        ]
      };
      console.log("This");
    } else {
      console.log("False");
    }

    // AJAX post the data to the friends API.
    //   $.post("/api/friends", userData, function(data) {

    //     // Grab the result from the AJAX post so that the best match's name and photo are displayed.
    //     $("#match-name").text(data.name);
    //     $("#match-img").attr("src", data.photo);

    //     // Show the modal with the best match
    //     $("#results-modal").modal("toggle");

    //   });
    // } else {
    //   alert("Please fill out all fields before submitting!");
    // }
  });
});
