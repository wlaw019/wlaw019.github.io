import React from 'react'

class FormCourse extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      course: "",
      cohort: "",
      dategraduated: "",
      id: null
    }
  }


  render(){
    <div className="form">
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='course'>Course</label>
        <input type='text' value={this.state.course} id='course' onChange={this.handleChange}/>

        <label htmlFor='cohort'>Cohort</label>
        <input type='text' value={this.state.cohort} id='cohort' onChange={this.handleChange}/>

        <label htmlFor='dategraduated'>Date Graduated</label>
        <input type='date' value={this.state.dategraduated} id='dategraduated' onChange={this.handleChange}/>

        <input type='submit' value="Submit"/>
      </form>
    </div>
  }





}
