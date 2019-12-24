import React from 'react';
import Courses from './components/Courses.js'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      view: "home",
      formInputs:{
        course: null,
        cohort: null
      }
    }
  }



  render(){
    return(
      <div className="container">
        <header>
          <h1>gaOutcomes</h1>
        </header>
        <nav>
          <h2>NAVIGATE</h2>
          <h4>Home</h4>
          <h4>Add Course</h4>
        </nav>
        <Courses />
      </div>
    )
  }




}

export default App;
