import React from 'react';
import Courses from './components/Courses.js'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      view:{
        page: "home",
        pageTitle: "Overview"
      },
      formInputs:{
        course: null,
        cohort: null,
        id: null
      }
    }
  }


  handleView = (view, courseData) => {
    let pageTitle = "";
    
    let formInputs = {
      course: "",
      cohort: "",
      dategraduated: ""
    }

    switch(view){
      case "home":
        pageTitle = "Overview"
        break
      case "addCourse":
        pageTitle = "Add a new Course"
        break
      case "editCourse":
        pageTitle = "Edit Course"
        formInputs = {
          course: courseData.course,
          cohort: courseData.cohort,
          dategraduated: courseData.dategraduated,
          id: courseData.id
        }
        break
      default:
      break
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
