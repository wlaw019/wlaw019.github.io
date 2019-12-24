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
    <form onSubmit={this.handleSubmit}>
      <label htmlFor='course'>Course</label>
      <input type='text' value={this.state.course} id='course' onChange={this.handleChange}/>



    </form>
  }





}
