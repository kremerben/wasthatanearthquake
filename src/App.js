import React, { Component } from "react";
import './App.css';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from "./config/Constants";
import {findCoordinates} from "./utilities/GetLocation";
import {retrieveUSGSData} from "./utilities/RetrieveUSGSData";
import {Feedback} from "./components/Feedback";
import EarthquakeDetail from "./components/EarthquakeDetail";
import MainEarthquakeMap from "./components/MainEarthquakeMap";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE
      },
      usgsData: [],
      eq_data: [],
      feedbackText: "Calculating",
      choice: "day",
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
    let items = this.state.usgsData.slice(0,5).map( (option, key) => {
        return (
            <EarthquakeDetail key={key} value={option} />
        );
    });
    return (
        <ol id={"list"} className={"tilted-list"} >{items}</ol>
    );
  }

  renderMainEarthquakeMap() {
    return (
        <div id={"main-map"}>
            <MainEarthquakeMap eqData={this.state.usgsData.slice(0,5)} userLocation={this.state.location} />
        </div>
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
        {/* Feedback box */}
        <Feedback value={this.state.feedbackText}/>
        <p><small> {latitude}, {longitude} </small></p>
      </header>

      <h1> Recent Nearby Earthquakes </h1>
      {/*  Main Map */}
      {this.renderMainEarthquakeMap()}

      <h1> Nearest Earthquake data: </h1>
      {/* Multi maps */}
      {this.renderEarthquakeDetailList()}
    </div>
  );}
}

export default App;




