import React, { Component } from "react";
import './App.css';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from "./config/Constants";
import {findCoordinates} from "./utilities/GetLocation";
import {retrieveUSGSData} from "./utilities/RetrieveUSGSData";
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
      usgs_data: [],
      eq_data: [],
      feedbackText: "Calculating",
      choice: "hour",
    };

    this.loadData();

  }

  componentDidMount() {

    // trigger function to calculate the rest
    // this.compileEQData();

    this.setState({feedbackText: "It was probably nothing."})
  }


  loadData() {
    findCoordinates.bind(this)();

    retrieveUSGSData.bind(this)(this.state.choice, this.state.location);

    }

  renderEarthquakeDetailList() {
    let items = this.state.usgs_data.slice(0,5).map( (option, key) => {
        return (
            <EarthquakeDetail key={key} value={option} />
        );
    });
    return (
        <ol id={"list"} className={"tilted-list"} >{items}</ol>
    );
}

render() {
  const latitude = this.state.location.latitude.toFixed(4);
  const longitude = this.state.location.longitude.toFixed(4);

  return (
    <div className="App">
      <header className="App-header">
        {/*<Header />*/}
        <h3 className={"shake shake-constant shake-constant--hover"}>Did you feel something?</h3>
        <Feedback value={this.state.feedbackText}/>

        <p><small> {latitude}, {longitude} </small></p>

      </header>
      {/* Feedback box */}
      <h1> Recent Nearby Earthquakes </h1>

      <div> Main map goes here </div>
      {/*  Main Map */}

      <h1> Nearest Earthquake data: </h1>
      {/* Multi maps */}
      {this.renderEarthquakeDetailList()}

    </div>
  );}
}

export default App;




