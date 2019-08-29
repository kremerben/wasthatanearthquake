import React, { Component } from "react";
import './App.css';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from "./config/Constants";
import {addDistanceData} from "./utilities/CalculateDistance";
import {findCoordinates} from "./utilities/GetLocation";
import {retrieveUSGSData} from "./utilities/RetrieveUSGSData";
import {Feedback} from "./components/Feedback";
import EarthquakeDetail from "./components/EarthquakeDetail";
import MainEarthquakeMap from "./components/MainEarthquakeMap";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE
      },
      usgsData: [],
      feedbackText: "Calculating",
      timeFrameChoice: "day",
      is_loading: true,
      could_feel: false,
    };
  }

  componentDidMount() {

    this.loadData()
      .then(
        data => {
          const [user_location, usgsData] = data;
          const [compliedData, could_feel] = addDistanceData(user_location, usgsData);

          this.setState({
            userLocation: user_location,
            usgsData: compliedData,
            could_feel: could_feel
          });
      }).then(
        res => {
          this.setState({is_loading: false});
        }
      );
  }

  async loadData() {
    try {
      const user_location = findCoordinates();
      const usgsData = retrieveUSGSData(this.state.timeFrameChoice);
      return await Promise.all([user_location, usgsData]);

    } catch(err) {
      console.log('error:: ' + err)
    }
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
            <MainEarthquakeMap
                eqData={this.state.usgsData.slice(0,5)}
                userLocation={this.state.userLocation} />
        </div>
    );
  }

render() {
  const latitude = this.state.userLocation.latitude.toFixed(4);
  const longitude = this.state.userLocation.longitude.toFixed(4);

  return (
    <div className="App">
      <header className="App-header">
        {/*<Header />*/}
        <h3 className={"shake shake-constant shake-constant--hover"}>Did you feel something?</h3>
        {/* Feedback box */}
        <Feedback value={this.state.could_feel}/>
        <p><small> {latitude}, {longitude} </small></p>
      </header>
      {this.state.is_loading &&
             <h1> Loading... </h1>
      }

      {!this.state.is_loading &&
          <div>
            <h1 className={"shake shake-constant shake-constant--hover"}> Recent Nearby Earthquakes </h1>
            {this.renderMainEarthquakeMap()}

            <h1 className={"shake shake-constant shake-constant--hover"}> Nearest Earthquake data: </h1>
            {this.renderEarthquakeDetailList()}
          </div>
      }
    </div>
  );}
}

export default App;




