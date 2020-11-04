import React, {Component} from 'react'

class Form extends Component {
  state = {
    bases: ''
  }

//   state = this.initialState

  render() {
    const { bases } = this.state;
  
    return (
      <form>
        <label htmlFor="bases">Find sequences that contain bases:</label>
        <input
          type="text"
          name="bases"
          id="bases"
          value={bases}
          onChange={this.handleChange} />
        {/* <label htmlFor="job">Job</label>
        <input
          type="text"
          name="job"
          id="job"
          value={job}
          onChange={this.handleChange} /> */}
        <input type="button" value="Submit" onClick={this.submitForm} />
      </form>
    );
  }

  submitForm = () => {
      this.props.handleSubmit(this.state)
  }

  handleChange = (event) => {
  const {name, value} = event.target

  this.setState({
    [name]: value,
  })
}
}

export default Form;