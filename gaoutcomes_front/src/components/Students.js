import React from 'react';
import Analytics from './Analytics.js'


class Students extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      minDays: "",
      maxDays: "",
      avgDays: "",
      daysArray: "",
      daysArrayIndex: ""
    }
  }

// ========================
// getDays function to calculate the summary
// ========================
  getDays = () => {
    if (this.props.students.length!== 0) {
      let days = "";
      let daysArray = [];
      let daysArrayIndex = [];

      for (var i = 0; i < this.props.students.length; i++) {

        if (this.props.students[i].dateoffer===null) {
          days = Math.floor((new Date()-new Date(this.props.students[0].dategraduated))/86400000);
        } else {
          days = Math.floor((new Date(this.props.students[i].dateoffer)-new Date(this.props.students[0].dategraduated))/86400000)
        }

        daysArray.push(days);
        daysArrayIndex.push(this.props.students[i].name);
      }

      this.setState({
        minDays: Math.min(...daysArray),
        maxDays: Math.max(...daysArray),
        avgDays: Math.round(daysArray.reduce((a, b) => a + b)/daysArray.length),
        daysArray: daysArray,
        daysArrayIndex: daysArrayIndex
      }, console.log(this.state), setTimeout(() => console.log(this.state), 500))
    }
  }

  componentDidMount(){
    this.getDays();
  }



  render(){
    return(
      <>
        {this.props.students.length!==0?
          <>
            <h3>{this.props.students[0].course}: {this.props.students[0].cohort}</h3>
            <h3>Date Graduated: {new Date(this.props.students[0].dategraduated).toLocaleDateString("en-US")}</h3>

            <div className="summary">
              <h4>Min(Number of Days): {this.state.minDays}</h4>
              <h4>Avg(Number of Days): {this.state.avgDays}</h4>
              <h4>Max(Number of Days): {this.state.maxDays}</h4>
            </div>
          </>
          : null}



        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date 1st Offer</th>
              <th>Search Time (Days)</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.students.map((student) => (

              <tr className="student-row"

               className = {student.dateoffer===null?
                 Math.floor((new Date()-new Date(this.props.students[0].dategraduated))/86400000)===this.state.maxDays? "student-row-highlight": null


                 :Math.floor((new Date(student.dateoffer)-new Date(this.props.students[0].dategraduated))/86400000)===this.state.maxDays? "student-row-highlight": null}

               key={student.id}>

                <td>{student.name}</td>

                {student.dateoffer===null? <td>pending</td>
                : <td>{new Date(student.dateoffer).toLocaleDateString("en-US")}</td>}

                {student.dateoffer===null?
                <td>{Math.floor((new Date()-new Date(this.props.students[0].dategraduated))/86400000)}</td>
                : <td>{Math.floor((new Date(student.dateoffer)-new Date(this.props.students[0].dategraduated))/86400000)}</td>}


                <td className="table-button"><button onClick={() => {this.props.handleView("editStudent", student)}}>&#9998;</button></td>
                <td className="table-button"><button onClick={() => {this.props.handleDelete(student.id, setTimeout(() => this.getDays(), 500))





                }}>&#128465;</button></td>
              </tr>
            ))
        }
          </tbody>
        </table>
        <br/>
        <Analytics daysArray={this.state.daysArray} daysArrayIndex={this.state.daysArrayIndex}/>
      </>
    )
  }
}

export default Students;
