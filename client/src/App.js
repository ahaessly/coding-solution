import './App.css';

import React, {Component} from 'react'
import SequenceTable from './SequenceTable' 
import FindSequenceForm from './FindSequenceForm'
import ConfigBQForm from './ConfigBQForm'

class App extends Component {
  state = {
    bases: '',
    urlBase: "http://localhost:3003",
    sequences: [],
    project: '',
    dataset: '',
    table: ''
  };

  fetchSeqeunces(bases) {
   const match_url = `${this.state.urlBase}/sequence/match/`
   console.log(bases)
   var url = match_url + bases.bases.toUpperCase()
   console.log(url)
   fetch(url)
     .then((result) => result.json())
     .then((result) => {
       this.setState({
        sequences: result,
        bases:bases.bases
       })
     })
  }

  setDBInfo(inputs) {
    console.log(this.props, inputs)
    const db_url = `${this.state.urlBase}/dbinfo/${inputs.project}/${inputs.dataset}/${inputs.table}`
    console.log(db_url)
    fetch(db_url, {method: 'POST'})
      .then((async response => {
        // const data = await response.json();
        if (response.ok) {
          this.setState({project:`${this.props.project}`, dataset:`${this.props.dataset}`, table:`${this.props.table}`})
        } else {
          return Promise.reject(`Could not set DBInfo ${response}`);
        }
      }))
  }

  render() {
    return (
        <div>
          <ConfigBQForm handleSubmit={this.handleBQSubmit} url={this.state.urlBase} />
          <p/><p/>
          <FindSequenceForm handleSubmit={this.handleSubmit} />
          <p/>
          <SequenceTable {...this.state} />
        </div>
    )
    }

    handleSubmit = (bases) => {
        this.fetchSeqeunces(bases)
    }

    handleBQSubmit = (project, dataset, table) => {
      this.setDBInfo(project, dataset, table)
    }
};


export default App
