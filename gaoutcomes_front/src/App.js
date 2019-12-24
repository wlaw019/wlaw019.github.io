import React from 'react';
import Courses from './components/Courses.js'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      view: "home",
      formInputs:{
        course: null,
        cohort: null,
        id: null
      }
    }
  }


  handleView = (view, courseData) => {
    let formInputs = {
      course: "",
      cohort: "",
      dategraduated: ""
    }

    if (view==="editCourse") {
      formInputs = {
        course: courseData.course,
        cohort: courseData.cohort,
        dategraduated: courseData.dategraduated,
        id: courseData.id
      }
    }

    this.setState({
      view: view,
      formInputs: formInputs
    })
  }


  render(){
    return(
      <div className="container">
        <header>
          <h1>gaOutcomes</h1>
        </header>
        <nav>
          <h2>NAVIGATE</h2>
          <h4 onClick={() => {this.handleView("home")}}>Home</h4>
          <h4 onClick={() => {this.handleView("addCourse")}}>Add Course</h4>
        </nav>
        <Courses />
      </div>
    )
  }




}

export default App;
