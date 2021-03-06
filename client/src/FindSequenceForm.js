import React, {Component} from 'react'

const re = new RegExp("^[actgACTG]*$");

class FindSequenceForm extends Component {
  state = {
    bases: ''
  }

  render() {
    const { bases } = this.state;
  
    return (
      <div>
      <form>
        <label htmlFor="bases">Find sequences that contain bases: </label>
        <input
          type="text"
          name="bases"
          id="bases"
          value={bases}
          onChange={this.handleChange} 
        />
        <input type="button" value="Submit" 
          onClick={this.submitForm}
        />
      </form>
      </div>
    );
  }


  submitForm = () => {
    this.props.handleSubmit(this.state)
  }

  handleChange = (event) => {
    const {name, value} = event.target

    if (re.test(value)) {
      this.setState({
        [name]: value,
      })
    }
  }
}

export default FindSequenceForm;