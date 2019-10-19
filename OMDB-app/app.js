const movie = ["The Avengers","Back to the Future","Batman","Batman V Superman: Dawn of Justice","Beverly Hills Cop","The Blair Witch Project","The Bourne Identity","The Bourne Ultimatum","The Breakfast Club","Captain America: Civil War","Casino Royale","Cast Away","Crocodile Dundee","The Dark Knight"];



$(() => {

/////////////////////////////////////////////
// getData function: populate grids with info and rightAns button
/////////////////////////////////////////////
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
          const $ans = $("<div>").addClass("ans").appendTo($questionDiv);
          const $button1 = $("<button>").addClass("rightAns").text(data.Year).appendTo($ans);
          $questionDiv.hide();

          // click on genre to display question
          $genre.on("click",() => {
            $genre.hide();
            $questionDiv.toggle();
          })

          // click on right ans to empty everything in grid then display "O"
          $button1.on("click", () => {
            $(x).empty().text("O").addClass("O");
          })

          // getDataBtn1 function to generate first wrongAns
          let movieIndexWrong1 = Math.floor(Math.random()*movie.length);
          getDataBtn1(movie[movieIndexWrong1],gridId);
        },
      ()=>{
        console.log('bad');
      }
    );

  }

/////////////////////////////////////////////
// getDataBtn1 function: callback function in getData to generate first wrongAns button
/////////////////////////////////////////////
const getDataBtn1 = (movieTitle, gridId) => {

  $.ajax({
    url:'http://www.omdbapi.com/?apikey=53aa2cd6&t='+movieTitle
  }).then(
    (data)=>{

        let x = "#"+gridId;
        let $ans = $(x).children().eq(1).children().eq(2);
        // console.log($ans);
        const $button2 = $("<button>").addClass("wrongAns").text(data.Year).appendTo($ans);

        // click on wrong ans to empty everything in grid then display "X"
        $button2.on("click", () => {
          $(x).empty().text("X").addClass("X");
        })

        // getDataBtn2 function to generate second wrongAns
        let movieIndexWrong2 = Math.floor(Math.random()*movie.length);
        getDataBtn2(movie[movieIndexWrong2],gridId);
    },
    ()=>{
      console.log('bad');
    }
  );

}

/////////////////////////////////////////////
// getDataBtn2 function: callback function in getDataBtn1 to generate second wrongAns button and shuffle buttons
/////////////////////////////////////////////
const getDataBtn2 = (movieTitle, gridId) => {

  $.ajax({
    url:'http://www.omdbapi.com/?apikey=53aa2cd6&t='+movieTitle
  }).then(
    (data)=>{

        let x = "#"+gridId;
        let $ans = $(x).children().eq(1).children().eq(2);
        // console.log($ans);
        const $button2 = $("<button>").addClass("wrongAns").text(data.Year).appendTo($ans);

        // click on wrong ans to empty everything in grid then display "X"
        $button2.on("click", () => {
          $(x).empty().text("X").addClass("X");
        })

        // shuffle buttons
        shuffleBtn(gridId);
    },
    ()=>{
      console.log('bad');
    }
  );

}

/////////////////////////////////////////////
// shuffleBtn function
/////////////////////////////////////////////
const shuffleBtn = (gridId) => {

  let x = "#"+gridId;
  let $ans = $(x).children().eq(1).children().eq(2);

  for (let k = $ans.children().length; k >= 0; k--) {
    $ans.append($ans.children().eq(Math.floor(Math.random() * k)));
  }

}

/////////////////////////////////////////////
// generateGrid function
/////////////////////////////////////////////
const generateGrid = () => {
  for (let i = 1; i <= 9; i++) {
  		let $div = $('<div>');
  		$div.addClass('grid').attr("id", i);
  		$('.container').append($div);

      let movieIndex = Math.floor(Math.random()*movie.length);
      getData(movie[movieIndex],i);
    }
}

generateGrid()



}) //document on load
