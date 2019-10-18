const movie = ["The Avengers","Back to the Future","Batman","Batman V Superman: Dawn of Justice","Beverly Hills Cop","The Blair Witch Project","The Bourne Identity","The Bourne Ultimatum","The Breakfast Club","Captain America: Civil War","Casino Royale","Cast Away","Crocodile Dundee","The Dark Knight"];

let currentGrid

$(() => {

  const getData = (movieTitle, gridId) => {
    // let userInput = $('input[type="text"]').val();



    $.ajax({
      url:'http://www.omdbapi.com/?apikey=53aa2cd6&t='+movieTitle
    }).then(
      (data)=>{
        console.log(data);

          let x = "#"+gridId;
          console.log(x);
          let splitGenre = data.Genre.split(",")[0];
          const $genre = $("<h3>").addClass("genre").text(splitGenre).appendTo($(x));

          const $questionDiv = $("<div>").addClass("questionDiv").appendTo($(x));
          const $title = $("<h4>").addClass("title").text(data.Title).appendTo($questionDiv);
          const $question = $("<p>").addClass("question").text("Year").appendTo($questionDiv);
          const $button1 = $("<button>").addClass("rightAns").text(data.Year).appendTo($questionDiv);
          $questionDiv.hide();

          $(x).on("click",() => {
            $genre.hide();
            $questionDiv.toggle();
          })

          
          //
          // $police.on("click",(event) => {
          //   $(event.target).parent().siblings().toggle();
          // })


      },
      ()=>{
        console.log('bad');
      }
    );

  }

const generateGrid = () => {
  for (let i = 1; i <= 9; i++) {
  		let $div = $('<div>');
  		$div.addClass('grid').attr("id", i);
  		$('.container').append($div);

      let movieIndex = Math.floor(Math.random()*movie.length);
      getData(movie[movieIndex],i);


    }




}

generateGrid();

  // Assign on click to buttons
  // $("#brooklyn").on("click",(event) => {getData("BROOKLYN")})
  // $("#manhattan").on("click",(event) => {getData("MANHATTAN")})
  // $("#queens").on("click",(event) => {getData("QUEENS")})
  // $("#bronx").on("click",(event) => {getData("BRONX")})
  // $("#statenIsland").on("click",(event) => {getData("STATEN ISLAND")})


}) //document on load