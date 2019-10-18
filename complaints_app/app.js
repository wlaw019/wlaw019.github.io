$(() => {

  const getData = (borough) => {
    let userInput = $('input[type="text"]').val();
    // Assign default value of 10 complaints if left empty
    if (!userInput) {
      userInput = 10;
    }


    $.ajax({
      url: "https://data.cityofnewyork.us/resource/erm2-nwe9.json",
      type: "GET",
      data: {
        "$limit" : 1000,
        "agency" : "NYPD",
        "borough": borough
      }
    }).then(
      (data)=>{
        console.log(data);
        $("main").empty();

        for (var i = 0; i < userInput; i++) {
          const $container = $("<div>").addClass("container").appendTo($("main"));
          const $row = $("<div>").addClass("row").appendTo($container);


          const $complaint = $("<h2>").text(data[i].complaint_type).appendTo($row);
          const $police = $("<button>").addClass("police").text("WHAT DID THE POLICE DO?").appendTo($row);
          const $resolution = $("<p>").text(data[i].resolution_description).appendTo($container).hide();

          $police.on("click",(event) => {
            $(event.target).parent().siblings().toggle();
          })
        }

      },
      ()=>{
        console.log('bad');
      }
    );

  }


  // Assign on click to buttons
  $("#brooklyn").on("click",(event) => {getData("BROOKLYN")})
  $("#manhattan").on("click",(event) => {getData("MANHATTAN")})
  $("#queens").on("click",(event) => {getData("QUEENS")})
  $("#bronx").on("click",(event) => {getData("BRONX")})
  $("#statenIsland").on("click",(event) => {getData("STATEN ISLAND")})


}) //document on load
