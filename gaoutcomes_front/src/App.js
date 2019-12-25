import React from 'react';
import Courses from './components/Courses.js'
import FormCourse from './components/FormCourse.js'

// ========================
// URL for psql database
// ========================
let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000'
} else {
  console.log('this is for heroku');
}


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      courses: [],
      view:{
        page: "home",
        pageTitle: "Overview"
      },
      formInputs:{
        course: null,
        cohort: null,
        dategraduated: null,
        id: null
      }
    }
  }

// ========================
// Handlers
// ========================
  handleView = (view, courseData) => {
    let pageTitle = "";

    let formInputs = {
      course: "",
      cohort: "",
      dategraduated: "",
      id: null
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
          dategraduated: new Date(courseData.dategraduated).toISOString().split('T')[0],
          id: courseData.id
        }
        break
      default:
      break
    }

    this.setState({
      view: {page: view, pageTitle: pageTitle},
      formInputs: formInputs
    })
  }


  handleCreate = (createData) => {
    fetch(`${baseUrl}/courses`, {
      body: JSON.stringify(createData),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(createdCourse => {
        this.handleView('home')
        this.fetchCourses()
      }).catch(err => console.log(err))
  }


  handleUpdate = (updateData) => {
    fetch(`${baseUrl}/courses/${updateData.id}`, {
      body: JSON.stringify(updateData),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(updatedCourse => {
        this.handleView('home')
        this.fetchCourses()
      }).catch(err => console.log(err))
  }


  handleDelete = (id) => {
    fetch(`${baseUrl}/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(json => {
        this.setState({
          courses: this.state.courses.filter(course => course.id !== id)
        })
      }).catch(err => console.log(err))
  }

// ========================
// Run fetchCourses after page  loads
// ========================
    fetchCourses = () => {
      fetch(`${baseUrl}/courses`)
      .then(data=>data.json())
      .then(jData=> {
        this.setState({courses:jData})
      }).catch(err=>console.log(err))
    }


    componentDidMount(){
      this.fetchCourses()
    }


  render(){
    return(
      <div className="container">
        <header>
          <h1>gaOutcomes</h1>

        </header>
        <nav>
          <h4 onClick={() => {this.handleView("home")}}>Home</h4>
          <h4 onClick={() => {this.handleView("addCourse")}}>Add Course</h4>
          <h4>Analytics</h4>
        </nav>

        <h2>{this.state.view.pageTitle}</h2>
        {this.state.view.page === "home"?
        <Courses handleView={this.handleView} handleDelete={this.handleDelete} courses={this.state.courses} />
        :<FormCourse handleView={this.handleView} handleCreate={this.handleCreate} handleUpdate={this.handleUpdate} view={this.state.view} formInputs={this.state.formInputs} />}

      </div>
    )
  }




}

export default App;
