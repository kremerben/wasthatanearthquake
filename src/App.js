import React, { Component } from "react";
import "./App.css";

import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  TIME_FRAME_CHOICES
} from "./config/Constants";

import { Dropdown } from "./components/Dropdown";
import { Feedback } from "./components/Feedback";
import EarthquakeDetail from "./components/EarthquakeDetail";
import MainEarthquakeMap from "./components/MainEarthquakeMap";
import { addDistanceData } from "./utilities/CalculateDistance";
import { findCoordinates } from "./utilities/GetLocation";
import { retrieveUSGSData } from "./utilities/RetrieveUSGSData";

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
      timeframeChoice: "day",
      is_loading: true,
      could_feel: false
    };
  }

  componentDidMount() {
    this.initializeData();
  }

  initializeData(choice = this.state.timeframeChoice) {
    this.setState({ is_loading: true });

    this.loadData(choice)
      .then(data => {
        const [user_location, usgsData] = data;
        const [compliedData, could_feel] = addDistanceData(
          user_location,
          usgsData
        );

        this.setState({
          userLocation: user_location,
          usgsData: compliedData,
          could_feel: could_feel
        });
      })
      .then(res => {
        this.setState({ is_loading: false });
      });
  }

  async loadData(choice) {
    try {
      const user_location = findCoordinates();
      const usgsData = retrieveUSGSData(choice);
      return await Promise.all([user_location, usgsData]);
    } catch (err) {
      console.log("error:: " + err);
    }
  }

  renderEarthquakeDetailList() {
    let items = this.state.usgsData.slice(0, 5).map((option, key) => {
      return <EarthquakeDetail key={key} value={option} />;
    });
    return (
      <ol id={"list"} className={"tilted-list"}>
        {items}
      </ol>
    );
  }

  renderMainEarthquakeMap() {
    return (
      <div id={"main-map"}>
        <MainEarthquakeMap
          eqData={this.state.usgsData.slice(0, 5)}
          userLocation={this.state.userLocation}
        />
      </div>
    );
  }

  handleTimeframeUpdate(choice) {
    this.setState({ timeframeChoice: choice }, this.initializeData(choice));
  }

  render() {
    const latitude = this.state.userLocation.latitude.toFixed(4);
    const longitude = this.state.userLocation.longitude.toFixed(4);

    return (
      <div className="App">
        <header className="App-header">
          {/*<Header />*/}
          <h3 className={"shake shake-constant shake-constant--hover"}>
            Did you feel something? {this.state.timeframeChoice}
          </h3>
          {/* Feedback box */}
          <Feedback
            value={this.state.could_feel}
            loading={this.state.is_loading}
          />
        </header>
        <Dropdown
          handleTimeframeUpdate={this.handleTimeframeUpdate.bind(this)}
          initialSelect={this.state.timeframeChoice}
          choices={TIME_FRAME_CHOICES}
          options={{
            title: "Timeframe",
            ulid: "full-width-dropdown"
          }}
        />
        {this.state.is_loading && <h1> Loading... </h1>}

        {!this.state.is_loading && (
          <div>
            <h1 className={"shake shake-constant shake-constant--hover"}>
              Recent Nearby Earthquakes
            </h1>
            {this.renderMainEarthquakeMap()}

            <h1 className={"shake shake-constant shake-constant--hover"}>
              Nearest Earthquake data:
            </h1>
            {this.renderEarthquakeDetailList()}
          </div>
        )}
        <p>
          <small>
            {latitude}, {longitude}
          </small>
        </p>
      </div>
    );
  }
}

export default App;
