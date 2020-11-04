import logo from './logo.svg';
import './App.css';

import React, {Component} from 'react'
import Table from './Table' 
import Form from './Form'


class App extends Component {
  state = {
    bases: "",
    sequences: [],
  };

  fetchSeqeunces(bases) {
   const match_url = 'http://localhost:3003/sequence/match/'
   // const url = 'http://localhost:4000/sequence/seq_05erEbwq'
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
        <div className="container">
          <Form handleSubmit={this.handleSubmit} />
          <Table {...this.state}/>
        </div>
    )
    }

    handleSubmit = (bases) => {
        this.fetchSeqeunces(bases)
    }
};


export default App
