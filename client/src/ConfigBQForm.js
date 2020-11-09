import React, {Component} from 'react'


class ConfigBQForm extends Component {
  state = {
    project: '',
    dataset: '',
    table: '',
    token: ''
  }

  submitEnabled
  render() {
    return (
      <form>
        <label htmlFor="dbinfo">Set BQ table info: </label>
        <input
          type="text"
          name="project"
          id="project"
          value={this.state.project}
          onChange={this.handleChange} 
        />
        <input
          type="text"
          name="dataset"
          id="dataset"
          value={this.state.dataset}
          onChange={this.handleChange} 
        />
        <input
          type="text"
          name="table"
          id="table"
          value={this.state.table}
          onChange={this.handleChange} 
        />
        <input
          type="text"
          name="token"
          id="token"
          value={this.state.token}
          onChange={this.handleChange} 
        />
        <input type="button" value="Submit" 
          onClick={this.submitForm}
        />
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

export default ConfigBQForm;