import React, { Component } from "react";
// import logo from './logo.svg';
import './App.css';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from "./config/Constants";
import {findCoordinates} from "./utilities/GetLocation";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {location: {latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE}};

    this.findCoordinates = findCoordinates.bind(this);
  }




    componentDidMount() {
      this.findCoordinates()
    }


render() {
  const status = this.state.location.longitude;

  return (
    <div className="App">
      <header className="App-header">
        {/*<Header />*/}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          + {status}
        </a>
      </header>


    </div>
  );}
}

export default App;
