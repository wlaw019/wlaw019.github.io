import React from 'react'

class FormStudent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      course_id: "",
      dateoffer: "",
      id: null
    }
  }


  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }


  handleSubmit = (event) => {
    event.preventDefault()
    if(this.props.view.page === 'addStudent') {
      this.props.handleCreate(this.state)
    } else if(this.props.view.page === 'editStudent') {
      this.props.handleUpdate(this.state)
    }
  }


  componentDidMount() {
    this.setState({
      name: this.props.formInputsStudent.name,
      course_id: this.props.formInputsStudent.course_id,
      dateoffer: this.props.formInputsStudent.dateoffer,
      id: this.props.formInputsStudent.id
    })
  }


  render(){
    return(
      <>
        {this.props.students.length!==0? <h3>{this.props.students[0].course}: {this.props.students[0].cohort}</h3>: null}
        
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' value={this.state.name} id='name' onChange={this.handleChange}/>

            <label htmlFor='dateoffer'>Date 1st Offer</label>
            <input type='date' value={this.state.dateoffer} id='dateoffer' onChange={this.handleChange}/>

            <input type='submit' value="Submit"/>
          </form>
        </div>
      </>
    )
  }
}

export default FormStudent;
