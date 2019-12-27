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
              <th>Success (%)</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.courses.map((course) => (
              <tr className="course-row" onClick={() => {this.props.handleStudents(course.id)}} key={course.id}>
                <td>{course.course}</td>
                <td>{course.cohort}</td>
                <td>{new Date(course.dategraduated).toLocaleDateString("en-US")}</td>

                {this.props.allStudents.filter(student => student.course_id === course.id).length>0?
                  <td>{String(Math.round(this.props.allStudents.filter(student => student.course_id === course.id).filter(student => student.dateoffer !== null).length
                  /this.props.allStudents.filter(student => student.course_id === course.id).length*100))}</td>
                  : <td>Add Student</td>}

                <td className="table-button"><button onClick={(event) => {this.props.handleView("editCourse", course); event.stopPropagation();}}>&#9998;</button></td>

                <td className="table-button"><button onClick={(event) => {this.props.handleDelete(course.id); event.stopPropagation();}}>&#128465;</button></td>
              </tr>
            ))

        }
          </tbody>
        </table>
    )
  }
}

export default Courses;
