import './App.css';

import React, {Component} from 'react'
import Table from './Table' 
import Form from './Form'

class App extends Component {
  state = {
    bases: "",
    urlBase: "http://localhost",
    port: 3000,
    sequences: [],
  };

  fetchSeqeunces(bases) {
   const match_url = `${this.state.urlBase}:${this.state.port}/sequence/match/`
   console.log(bases)
   var url = match_url + bases.bases
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

  render() {
    return (
        <div>
          <Form handleSubmit={this.handleSubmit} />
          <Table {...this.state} />
        </div>
    )
    }

    handleSubmit = (bases) => {
        this.fetchSeqeunces(bases)
    }
};


export default App
