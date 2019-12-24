import React from 'react';

let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000'
} else {
  console.log('this is for heroku');
}

class Courses extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      courses: []
    }
  }


  fetchCourses = () => {
    fetch(`${baseUrl}/students`)
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
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Cohort</th>
            <th>Date Graduated</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.courses.map((course) => (
            <tr key={course.id}>
              <td>{course.course}</td>
              <td>{course.cohort}</td>
              <td>{course.dategraduated}</td>
              <td><button>&#9998;</button></td>
              <td><button>&#128465;</button></td>
            </tr>
          ))
      }
      </tbody>
      </table>
    )
  }




}

export default Courses;
