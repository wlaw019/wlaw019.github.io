import React from 'react';
import Courses from './components/Courses.js'
import FormCourse from './components/FormCourse.js'
import Students from './components/Students.js'
import FormStudent from './components/FormStudent.js'

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
        pageTitle: "Course Overview"
      },
      formInputs:{
        course: null,
        cohort: null,
        dategraduated: null,
        id: null
      },
      formInputsStudent:{
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

    let formInputsStudent = {
      name: "",
      course_id: "",
      dateoffer: "",
      id: null
    }

    switch(view){
      case "home":
        pageTitle = "Course Overview"
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
        pageTitle = "Class Overview"
        formInputsStudent = {
          name: "",
          course_id: data,
          dateoffer: "",
          id: ""
        }

        this.setState({
          formInputsStudent: formInputsStudent
        })
        break
      case "addStudent":
        pageTitle = "Aa a new Student"
        // formInputsStudent = {
        //   name: data.name,
        //   course_id: data.course_id,
        //   dateoffer: new Date(data.dateoffer).toISOString().split('T')[0],
        //   id: data.id
        // }
        break
      case "editStudent":
        pageTitle = "Edit Student"
        formInputsStudent = {
          name: data.name,
          course_id: data.course_id,
          dateoffer: new Date(data.dateoffer).toISOString().split('T')[0],
          id: data.id
          }

        this.setState({
          formInputsStudent: formInputsStudent
        })
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
    let finalUrl = "";

    if (this.state.view.page==="addCourse") {
      finalUrl = `${baseUrl}/courses`;
    } else if (this.state.view.page==="addStudent") {
      finalUrl = `${baseUrl}/students`;
    }

    fetch(finalUrl, {
      body: JSON.stringify(createData),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(createdCourse => {

      if (this.state.view.page==="addCourse") {
        this.handleView('home');
        this.fetchCourses();
      } else if (this.state.view.page==="addStudent") {
        this.handleStudents(createData.course_id);
      }

      }).catch(err => console.log(err))
  }


  handleUpdate = (updateData) => {
    let finalUrl = "";

    if (this.state.view.page==="editCourse") {
      finalUrl = `${baseUrl}/courses/${updateData.id}`;
    } else if (this.state.view.page==="editStudent") {
      finalUrl = `${baseUrl}/students/${updateData.id}`;
    }

    fetch(finalUrl, {
      body: JSON.stringify(updateData),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(updatedCourse => {

      if (this.state.view.page==="editCourse") {
        this.handleView('home');
        this.fetchCourses();
      } else if (this.state.view.page==="editStudent") {
        this.handleStudents(updateData.course_id);
      }

      }).catch(err => console.log(err))
  }


  handleDelete = (id) => {
    let finalUrl = "";

    if (this.state.view.page==="home") {
      finalUrl = `${baseUrl}/courses/${id}`;
    } else if (this.state.view.page==="students") {
      finalUrl = `${baseUrl}/students/${id}`;
    }

    fetch(finalUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(json => {

      if (this.state.view.page==="home") {
        this.setState({
          courses: this.state.courses.filter(course => course.id !== id)
        })
      } else if (this.state.view.page==="students") {
        this.handleStudents(this.state.formInputsStudent.course_id);
      }
      
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
      this.handleView("students", course_id)
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
          {this.state.view.page === "home"?
          <h4 onClick={() => {this.handleView("addCourse")}}>Add Course</h4> : null}
          {this.state.view.page === "students"?
          <h4 onClick={() => {this.handleView("addStudent")}}>Add Student</h4> : null}
          <h4>Analytics</h4>
        </nav>

        <h2>{this.state.view.pageTitle}</h2>
        {this.state.view.page === "home"?
        <Courses handleView={this.handleView} handleDelete={this.handleDelete} courses={this.state.courses} handleStudents={this.handleStudents} /> : null}

        {this.state.view.page === "addCourse"||this.state.view.page === "editCourse"?
        <FormCourse handleCreate={this.handleCreate} handleUpdate={this.handleUpdate} view={this.state.view} formInputs={this.state.formInputs} />
        : null}

        {this.state.view.page === "students"?
        <Students students={this.state.students} handleView={this.handleView} handleDelete={this.handleDelete} /> : null}

        {this.state.view.page === "addStudent"||this.state.view.page === "editStudent"?
        <FormStudent handleCreate={this.handleCreate} handleUpdate={this.handleUpdate} view={this.state.view} formInputsStudent={this.state.formInputsStudent} students={this.state.students} />
        : null}




      </div>
    )
  }




}

export default App;
