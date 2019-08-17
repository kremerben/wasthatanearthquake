import React, { Component } from "react";
// import logo from './logo.svg';
import './App.css';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from "./config/Constants";
import {findCoordinates} from "./utilities/GetLocation";
import {Feedback} from "./Feedback";
import EarthquakeDetail from "./EarthquakeDetail";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE
      },
      feedbackText: "Calculating",
    };
    this.findCoordinates = findCoordinates.bind(this);
    this.findCoordinates()

  }




    componentDidMount() {
    // trigger function to calculate the rest
    }


render() {
  const status = this.state.location.longitude.toFixed(4);

  return (
    <div className="App">
      <header className="App-header">
        {/*<Header />*/}
        <h3>Did you feel something?</h3>
        <Feedback value={"It was probably nothing, ok!"}/>

        <p>
           {status}
        </p>

      </header>
      {/* Feedback box */}
      <h1> Recent Nearby Earthquakes </h1>

      <div> Map goes here </div>
      {/*  Main Map */}

      <h1> Nearest Earthquake data: </h1>
      {/* Multi maps */}
      <div> little maps go here </div>
      <ol id={"list"} className={"tilted-list"} >
        <EarthquakeDetail value={"iidk"} />
        <EarthquakeDetail value={"iidk"} />
      </ol>


    </div>
  );}
}

export default App;
