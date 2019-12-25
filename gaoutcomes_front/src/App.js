import React from 'react';
import Courses from './components/Courses.js'
import FormCourse from './components/FormCourse.js'
import Students from './components/Students.js'

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
      students: [],
      view:{
        page: "home",
        pageTitle: "Overview"
      },
      formInputs:{
        course: null,
        cohort: null,
        dategraduated: null,
        id: null
      },
      formInputsStudents:{
        name: null,
        course_id: null,
        dateoffer: null,
        id: null
      }
    }
  }

// ========================
// Handlers
// ========================
  handleView = (view, data) => {
    let pageTitle = "";

    let formInputs = {
      course: "",
      cohort: "",
      dategraduated: "",
      id: null
    }

    // let formInputsStudents = {
    //   name: "",
    //   course_id: "",
    //   dateoffer: "",
    //   id: null
    //   }

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
          course: data.course,
          cohort: data.cohort,
          dategraduated: new Date(data.dategraduated).toISOString().split('T')[0],
          id: data.id
        }
        break
      case "students":
        pageTitle = "Class"
        // formInputsStudents = {
        //   name: data.name,
        //   course_id: data.course_id,
        //   dateoffer: new Date(data.dateoffer).toISOString().split('T')[0],
        //   id: data.id
        //   }
          break
      default:
      break
    }

    this.setState({
      view: {page: view, pageTitle: pageTitle},
      formInputs: formInputs,
      // formInputsStudents: formInputsStudents
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


  handleStudents = (course_id) => {

    fetch(`${baseUrl}/students`)
    .then(data=>data.json())
    .then(jData=> {
      this.setState({
        students:jData.filter(course => course.course_id === course_id)
      })
    }).catch(err=>console.log(err))
    .then(() => {
      this.handleView("students")
    })
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
        <Courses handleView={this.handleView} handleDelete={this.handleDelete} courses={this.state.courses} handleStudents={this.handleStudents} /> : null}

        {this.state.view.page === "addCourse"||this.state.view.page === "editCourse"?
        <FormCourse handleView={this.handleView} handleCreate={this.handleCreate} handleUpdate={this.handleUpdate} view={this.state.view} formInputs={this.state.formInputs} />
        : null}

        {this.state.view.page === "students"?
        <Students students={this.state.students} /> : null}




      </div>
    )
  }




}

export default App;
