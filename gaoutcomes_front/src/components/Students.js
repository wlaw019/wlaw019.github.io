import React from 'react';


class Students extends React.Component{

  render(){
    return(
      <>
        {this.props.students.length!==0?
          <>
          <h3>{this.props.students[0].course}: {this.props.students[0].cohort}</h3>
          <h3>Date Graduated: {new Date(this.props.students[0].dategraduated).toLocaleDateString("en-US")}</h3>
          </>
          : null}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date 1st Offer</th>
              <th>Number of Days</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.students.map((student) => (
              <tr className="student-row" key={student.id}>
                <td>{student.name}</td>

                {student.dateoffer===null? <td>pending</td>
                : <td>{new Date(student.dateoffer).toLocaleDateString("en-US")}</td>}

                {student.dateoffer===null?
                <td>{Math.floor((new Date()-new Date(this.props.students[0].dategraduated))/86400000)}</td>
                : <td>{Math.floor((new Date(student.dateoffer)-new Date(this.props.students[0].dategraduated))/86400000)}</td>}


                <td className="table-button"><button onClick={() => {this.props.handleView("editStudent", student)}}>&#9998;</button></td>
                <td className="table-button"><button onClick={() => {this.props.handleDelete(student.id)}}>&#128465;</button></td>
              </tr>
            ))
        }
          </tbody>
        </table>
      </>
    )
  }
}

export default Students;
