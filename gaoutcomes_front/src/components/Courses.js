import React from 'react';


class Courses extends React.Component{

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
            this.props.courses.map((course) => (
              <tr key={course.id}>
                <td>{course.course}</td>
                <td>{course.cohort}</td>
                <td>{new Date(course.dategraduated).toLocaleDateString("en-US")}</td>
                <td><button onClick={() => {this.props.handleView("editCourse", course)}}>&#9998;</button></td>
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
