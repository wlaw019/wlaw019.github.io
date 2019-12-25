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


  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }


  handleSubmit = (event) => {
    console.log(this.state);
    event.preventDefault()
    if(this.props.view.page === 'addCourse') {
      this.props.handleCreate(this.state)
    } else if(this.props.view.page === 'editCourse') {
      this.props.handleUpdate(this.state)
    }
  }


  componentDidMount() {
    this.setState({
      course: this.props.formInputs.course,
      cohort: this.props.formInputs.cohort,
      dategraduated: this.props.formInputs.dategraduated,
      id: this.props.formInputs.id
    })
  }


  render(){
    return(
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
    )
  }
}

export default FormCourse;
