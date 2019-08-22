import React, { Component } from "react";

import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { GOOGLE_MAPS_API_KEY } from "../config/Constants";

class MainEarthquakeMap extends Component {
    constructor(props) {
        super(props);

        let markerLocations = [
            ["Your Location", props.userLocation.latitude, props.userLocation.longitude, "You"]
        ];

        // eslint-disable-next-line array-callback-return
        props.eqData.map((eq, key) => {
            let markerText = `<a href="${eq.properties.url} " target="_blank">${eq.properties.title}</a>`;
            markerLocations.push([
                {
                    text: markerText,
                    lat: eq.geometry.coordinates[1],
                    lng: eq.geometry.coordinates[1]
                }
            ]);
        });
        this.state = {
            userLocation: props.userLocation,
            locations: markerLocations,
            eqData: props.eqData
        };
    }

    displayMarkers = () => {
        return this.state.locations.map((location, index) => {
            return (
                <Marker
                    key={index}
                    id={index}
                    position={{
                        lat: location.lat,
                        lng: location.lng
                    }}
                    label={location.text}
                />
            );
        });
    };

    render() {
        const mapStyles = {
            height: "400px",
            width: "500px",
            position: "relative",
        };

        return (
            <Map
                google={this.props.google}
                zoom={7}
                style={mapStyles}
                initialCenter={{
                    lat: this.state.userLocation.latitude,
                    lng: this.state.userLocation.longitude
                }}
            >
                {this.displayMarkers()}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_MAPS_API_KEY
})(MainEarthquakeMap);
