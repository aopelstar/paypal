import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(){
    super();
    this.state={

    }
  }
  
  submit(){
    let body={
      price: 50
    }

    axios.post('http://localhost:3333/api/pay', body)
    
  }

  render() {
    return (
      <div className="App">
        <h1> For Sale
          </h1>
          <div>
            some dumb crap $88
            </div>
            <button onClick={() => this.submit()}>pay</button>

       
      </div>
    );
  }
}

export default App;
