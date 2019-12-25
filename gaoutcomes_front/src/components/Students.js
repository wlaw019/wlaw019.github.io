import React from 'react';


class Students extends React.Component{

  render(){
    return(
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date 1st Offer</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{new Date(student.dateoffer).toLocaleDateString("en-US")}</td>
                <td><button onClick={() => {this.props.handleView("editStudent", student)}}>&#9998;</button></td>
                <td><button onClick={() => {this.props.handleDelete(student.id)}}>&#128465;</button></td>
              </tr>
            ))
        }
          </tbody>
        </table>
    )
  }
}

export default Students;
