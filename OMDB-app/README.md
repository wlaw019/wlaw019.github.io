# OMDb Tic Tac Toe
https://wlaw019.github.io/OMDB-app/

* Randomly generate questions under three categories (Year, Director and Production) based on top 100 movies
* User can only reveal one question (Genre) at a time
* User put a "check" mark on the board if the question is answered correctly, otherwise a "X"
* Identity User Won, User Lost or No one Won and then freeze the board

## Resources Used

* OMDb API used for all the questions and answers data.  
Limitation: I can only get data one movie at a time.  No built-in filter by years or popularity as such.
http://www.omdbapi.com/

* Most popular 100 movies.
Limitation: I had to post-process the data to fit an array format
https://www.listchallenges.com/100-of-the-most-popular-movies-of-all-time

* Other databases explored but not used due to having the same limitation as OMDb (can only search by title)  
https://rapidapi.com/imdb/api/movie-database-imdb-alternative
https://rapidapi.com/IVALLC/api/entertainment-data-hub


### Technology Used
* HTML
* CSS   
* Javascript
* jQuery  
* Google Fonts

### Approach Taken
Here are the steps taken for every grid on board

![grid genre](img/genre.png)

![grid data](img/gridData.png)

```html
1  <div class = "grid">
2      <h3 class = "genre"></h3>
3      <div class = "questionDiv">
4          <h4 class = "title"></h4>
5          <p class = "question"></p>
6          <div class = "ans">
7              <button class = "rightAns"></button>
8              <button class = "wrongAns"></button>
9              <button class = "wrongAns"></button>
10         </div>
11     </div>
12 </div>
```
## Functions Used to populate grid
# getData()
* This function populates line 1 to 7 based on using the movie array
* Randomly picked movie and category then AJAX

# getDataBtn1()
* Callback function in getData()
* This function creates the 1st WrongAns button on line 8
* Randomly picked another movie but with the same category from getData() then run another AJAX

# getDataBtn2()
* Callback function in getDataBtn1
* This function creates 2nd WrongAns button on line 9
* Randomly picked another movie but with the same category from getData() then run another AJAX

# shuffleBtn()
* Callback function in getDataBtn2
* This function checks for duplicate buttons (rightAns = wrongAns, wrongAns1 = wrongAns2) and replace the wrongAns with another randomly generated answer based on the ansTotal array (contains all the ans generated for the board)
* Last step is to shuffle the buttons so that the rightAns is not always the first button


What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
