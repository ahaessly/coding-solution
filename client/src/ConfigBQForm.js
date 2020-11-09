import React, {Component} from 'react'


class ConfigBQForm extends Component {
  state = {
    project: '',
    dataset: '',
    table: '',
    inEdit: false
  }

  fetchDBInfo() {
    const url = `${this.props.url}/dbinfo`
    console.log(url)
    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
         project: result.project,
         dataset:result.dataset,
         table: result.table
        })
      })
   }
 
  componentDidMount() {
    this.fetchDBInfo()
  }

  render() {
    if (this.state.inEdit) {
      return this.renderEditForm()
    }
    return (
      <div>
        <text><b>BQ table:</b> {this.state.project}.{this.state.dataset}.{this.state.table}&nbsp;&nbsp;</text>
        <button onClick = {() => this.setState({inEdit: true})}>Edit</button>
      </div>
    )
  }

  renderEditForm() {
    return (
      <form>
        <h3>BQ table info</h3>
          <span>
            <label>Project Id:  </label>
              <input
              type="text"
              name="project"
              id="project"
              value={this.state.project}
              onChange={this.handleChange} 
              />
          </span>
          <span>
            <label>Dataset Name:  </label>
              <input
                type="text"
                name="dataset"
                id="dataset"
                value={this.state.dataset}
                onChange={this.handleChange} 
              />
          </span>
          <span>
            <label>Table name:  </label>
              <input
                type="text"
                name="table"
                id="table"
                value={this.state.table}
                onChange={this.handleChange} 
              />
          </span>
          <p/>
              <input type="button" value="Submit" onClick={this.submitForm}/>
      </form>
    );
  }


  submitForm = () => {
    this.props.handleSubmit(this.state)
    this.setState({inEdit: false})
  }

  handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value,
    })
  }
}

export default ConfigBQForm;