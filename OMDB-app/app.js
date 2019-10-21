const movie = ["The Avengers","Back to the Future","Batman","Beverly Hills Cop","The Blair Witch Project","The Bourne Identity","The Bourne Ultimatum","The Breakfast Club","Captain America: Civil War","Casino Royale","Cast Away","Crocodile Dundee","The Dark Knight","The Dark Knight Rises","Deadpool","Die Hard","Dracula","Dumb and Dumber","Dunkirk","E","The Empire Strikes Back","The Exorcist","Ferris Bueller's Day Off","Finding Nemo","Forrest Gump","Frozen","Furious 7","Ghostbusters","Gladiator","The Godfather","Goldfinger","Gone With the Wind","The Goonies","Groundhog Day","The Hangover","Harry Potter","Home Alone","Hook","The Hunger Games","The Incredibles","Independence Day","Indiana Jones and the Last Crusade","Indiana Jones and the Temple of Doom","Inside Out","Iron Man","Jaws","Jurassic Park","Jurassic World","The Lion King","The Lord of the Rings: The Fellowship of the Ring","The Lord of the Rings: The Return of the King","The Lord of the Rings: The Two Towers","The Matrix","Men in Black","Mission: Impossible","Monty Python and the Holy Grail","The Mummy","The Passion of the Christ","Pirates of the Caribbean: The Curse of the Black Pearl","Planet of the Apes","The Princess Bride","Psycho","Pulp Fiction","Rocky","Scary Movie","Shaun of the Dead","The Shawshank Redemption","Shrek","The Silence of the Lambs","Singin in the Rain","The Sixth Sense","Skyfall","The Sound of Music","Spaceballs","Spider-Man","Star Trek","Star Wars","Star Wars: Episode I - The Phantom Menace","Superman","The Ten Commandments","Terminator 2: Judgment Day","Titanic","Toy Story","Transformers","Twilight","Twister","X-Men"];

// Array for random questions
const category = ["Year", "Director", "Production"]

// Array to collect all answners generated
const year = [];
const director = [];
const production = [];


// Variable to check Win scenarios
let playerWin = "";

// Variable to keep track of when to reveal questions
let clickNum = 1;

$(() => {

/////////////////////////////////////////////
// getData function: populate grids with info and rightAns button
/////////////////////////////////////////////
  const getData = (movieTitle, category, gridId) => {
    // let userInput = $('input[type="text"]').val();

    $.ajax({
      url:'https://www.omdbapi.com/?apikey=53aa2cd6&t='+movieTitle
    }).then(
      (data)=>{

          let x = "#"+gridId;
          console.log(x);
          console.log(movieTitle);
        console.log(data);
          let splitGenre = data.Genre.split(",")[0];
          const $genre = $("<h3>").addClass("genre").text(splitGenre).appendTo($(x));

          const $questionDiv = $("<div>").addClass("questionDiv").appendTo($(x));
          const $title = $("<h4>").addClass("title").text(data.Title).appendTo($questionDiv);
          const $question = $("<p>").addClass("question").text(category).appendTo($questionDiv);
          const $ans = $("<div>").addClass("ans").appendTo($questionDiv);
          const $button1 = $("<button>").addClass("rightAns").text(data[category]).appendTo($ans);
          $questionDiv.hide();

          // push answner into correct array
          ansTotal(category, data);

          // click on genre to display question, freeze Genre with clickNum to ensure only one Genre can be revealed at a time
          $genre.on("click",() => {
            if (clickNum%2!==0) {
              $genre.hide();
              $questionDiv.toggle();
              clickNum++;
              console.log(clickNum);
            }

          })

          // click on right ans to empty everything in grid then display "O"
          $button1.on("click", () => {
            // $(x).empty().text("O").addClass("O");
            $(x).empty().html('&#10004;').addClass("O");
            checkWin("O");
            freezeBoard(playerWin);
            clickNum++;
            console.log(clickNum);
          })

          // getDataBtn1 function to generate first wrongAns
          let movieIndexWrong1 = Math.floor(Math.random()*movie.length);
          getDataBtn1(movie[movieIndexWrong1],category,gridId);
        },
      ()=>{
        console.log('bad');
      }
    );

  }

/////////////////////////////////////////////
// getDataBtn1 function: callback function in getData to generate first wrongAns button
/////////////////////////////////////////////
const getDataBtn1 = (movieTitle,category, gridId) => {

  $.ajax({
    url:'https://www.omdbapi.com/?apikey=53aa2cd6&t='+movieTitle
  }).then(
    (data)=>{

        let x = "#"+gridId;
        console.log("Btn1");
        console.log(x);
        console.log(movieTitle);
      console.log(data);
        let $ans = $(x).children().eq(1).children().eq(2);
        // console.log($ans);
        const $button2 = $("<button>").addClass("wrongAns").text(data[category]).appendTo($ans);

        // push answner into correct array
        ansTotal(category, data);

        // click on wrong ans to empty everything in grid then display "X"
        $button2.on("click", () => {
          $(x).empty().text("X").addClass("X");
          checkWin("X");
          freezeBoard(playerWin);
          clickNum++;
          console.log(clickNum);
        })

        // getDataBtn2 function to generate second wrongAns
        let movieIndexWrong2 = Math.floor(Math.random()*movie.length);
        getDataBtn2(movie[movieIndexWrong2],category,gridId);
    },
    ()=>{
      console.log('bad');
    }
  );

}

/////////////////////////////////////////////
// getDataBtn2 function: callback function in getDataBtn1 to generate second wrongAns button and shuffle buttons
/////////////////////////////////////////////
const getDataBtn2 = (movieTitle,category, gridId) => {

  $.ajax({
    url:'https://www.omdbapi.com/?apikey=53aa2cd6&t='+movieTitle
  }).then(
    (data)=>{

        let x = "#"+gridId;
        console.log("Btn2");
        console.log(x);
        console.log(movieTitle);
    console.log(data);
        let $ans = $(x).children().eq(1).children().eq(2);
        // console.log($ans);
        const $button2 = $("<button>").addClass("wrongAns").text(data[category]).appendTo($ans);

        // push answner into correct array
        ansTotal(category, data);

        // click on wrong ans to empty everything in grid then display "X"
        $button2.on("click", () => {
          $(x).empty().text("X").addClass("X");
          checkWin("X");
          freezeBoard(playerWin);
          clickNum++;
          console.log(clickNum);
        })

        // shuffle buttons
        shuffleBtn(gridId);
    },
    ()=>{
      console.log('bad');
    }
  );

}

console.log(year);
console.log(director);
console.log(production);
/////////////////////////////////////////////
// shuffleBtn function
/////////////////////////////////////////////
const shuffleBtn = (gridId) => {

  let x = "#"+gridId;
  let $ans = $(x).children().eq(1).children().eq(2);

  let $question = $ans.prev();

  // console.log("Random"+$ans.children().eq(0).text());
  while ((($ans.children().eq(0).text())===($ans.children().eq(1).text()))||
         (($ans.children().eq(0).text())===($ans.children().eq(2).text()))) {

          console.log(gridId + "*********************************" + $question.text());
          if ($question.text()==="Year") {
            $ans.children().eq(1).text(year[Math.floor(Math.random()*year.length)]);
          } else if ($question.text()==="Director") {
            $ans.children().eq(1).text(director[Math.floor(Math.random()*director.length)]);
          } else if ($question.text()==="Production") {
            $ans.children().eq(1).text(production[Math.floor(Math.random()*production.length)]);
          }


          if ($question.text()==="Year") {
            $ans.children().eq(2).text(year[Math.floor(Math.random()*year.length)]);
          } else if ($question.text()==="Director") {
            $ans.children().eq(2).text(director[Math.floor(Math.random()*director.length)]);
          } else if ($question.text()==="Production") {
            $ans.children().eq(2).text(production[Math.floor(Math.random()*production.length)]);
          }

  }




  // while ((($ans.children().eq(0).text())===($ans.children().eq(1).text()))||
  //       (($ans.children().eq(0).text())===($ans.children().eq(2).text()))) {
  //
  //
  //         if ($question.text()==="Year") {
  //           $ans.children().eq(1).text() = year[Math.floor(Math.random()*year.length)];
  //           console.log("Random" + year[Math.floor(Math.random()*year.length)]);
  //         } else if (category==="Director") {
  //           $ans.children().eq(1).text() = director[Math.floor(Math.random()*director.length)];
  //           console.log("Random" + director[Math.floor(Math.random()*director.length)]);
  //         } else if (category==="Production") {
  //           $ans.children().eq(1).text() = production[Math.floor(Math.random()*production.length)];
  //           console.log("Random" + production[Math.floor(Math.random()*production.length)]);
  //         }
  //
  //
  //
  //         if ($question.text()==="Year") {
  //           $ans.children().eq(2).text() = year[Math.floor(Math.random()*year.length)];
  //         } else if (category==="Director") {
  //           $ans.children().eq(2).text() = director[Math.floor(Math.random()*director.length)];
  //         } else if (category==="Production") {
  //           $ans.children().eq(2).text() = production[Math.floor(Math.random()*production.length)];
  //         }
  //
  // }


  for (let k = $ans.children().length; k >= 0; k--) {
    $ans.append($ans.children().eq(Math.floor(Math.random() * k)));
  }


}

/////////////////////////////////////////////
// checkWin function
/////////////////////////////////////////////
const checkWin = (symbol) => {
    let classCheck = "grid "+symbol

    // There are 8 win scenarios
    if ((($("#1").attr("class")===classCheck)&&($("#2").attr("class")===classCheck)&&($("#3").attr("class")===classCheck))||
    (($("#4").attr("class")===classCheck)&&($("#5").attr("class")===classCheck)&&($("#6").attr("class")===classCheck))||
    (($("#7").attr("class")===classCheck)&&($("#8").attr("class")===classCheck)&&($("#9").attr("class")===classCheck))||
    (($("#1").attr("class")===classCheck)&&($("#4").attr("class")===classCheck)&&($("#7").attr("class")===classCheck))||
    (($("#2").attr("class")===classCheck)&&($("#5").attr("class")===classCheck)&&($("#8").attr("class")===classCheck))||
    (($("#3").attr("class")===classCheck)&&($("#6").attr("class")===classCheck)&&($("#9").attr("class")===classCheck))||
    (($("#1").attr("class")===classCheck)&&($("#5").attr("class")===classCheck)&&($("#9").attr("class")===classCheck))||
    (($("#3").attr("class")===classCheck)&&($("#5").attr("class")===classCheck)&&($("#7").attr("class")===classCheck))
  ) {
      playerWin = "yes";
      if (symbol==="O") {
        alert("You won!")
      } else if (true) {
        alert("You lost!");
      }

    }
}

/////////////////////////////////////////////
// freezeBoard function: No more clicks can occur on board after win, check No one won scenario
/////////////////////////////////////////////
const freezeBoard = (playerWin) => {
  if (playerWin==="yes") {
    // No more clicks can occur on board
    $(".genre").off("click");
  } else {
    //Check all grids are occupied
    if ($(".grid").text().length===9) {
      alert("No one won!")
    }
  }
}

/////////////////////////////////////////////
// ansTotal function: collect all answners generated into correct array
/////////////////////////////////////////////
const ansTotal = (category, data) => {
  switch (category) {
    case "Year":
      year.push(data[category]);
      break;
    case "Director":
      director.push(data[category]);
      break;
    case "Production":
      production.push(data[category]);
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
      let categoryIndex = Math.floor(Math.random()*category.length);
      getData(movie[movieIndex],category[categoryIndex],i);
    }
}

/////////////////////////////////////////////
// start Game
/////////////////////////////////////////////
generateGrid();
$(".container").hide();
$("img").fadeOut(1000,() => {
  $(".container").fadeIn(1000);
})



}) //document on load
