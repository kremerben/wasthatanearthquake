import React, { Component } from "react";

import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { GOOGLE_MAPS_API_KEY } from "../config/Constants";

export class MainEarthquakeMap extends Component {
    constructor(props) {
        super(props);

        let markerLocations = props.eqData.map((eq, key) => {
            return ({
                title: eq.properties.title,
                url: eq.properties.url,
                lat: eq.geometry.coordinates[1],
                lng: eq.geometry.coordinates[0]
            });
        });
        markerLocations.push({
            title: "Your Location",
            lat: props.userLocation.latitude,
            lng: props.userLocation.longitude,
        }, );

        this.state = {
            userLocation: props.userLocation,
            markerLocations: markerLocations,
            eqData: props.eqData,
            showMarkerInfo: false,
            activeMarker: {},
            selectedMarker: {},
        };
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedMarker: props,
            activeMarker: marker,
            showMarkerInfo: true
        });

    onClose = (props) => {
        if (this.state.showMarkerInfo) {
            this.setState({
                showMarkerInfo: false,
                activeMarker: null
            })
        }
    };

    renderMapMarkers = (props) => {
            return this.state.markerLocations.map((location, index) => {
                return (
                    <Marker
                        key={"marker_" + index}
                        id={index}
                        position={{
                            lat: location.lat,
                            lng: location.lng
                        }}
                        // icon={{url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}}
                        title={location.title}
                        name={<a href={location.url} target="_blank" rel="noopener noreferrer">{location.title}</a>}
                        onClick={this.onMarkerClick}
                    />
            )
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
                onClick={this.onClose}
            >
                {this.renderMapMarkers()}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showMarkerInfo}
                    onClose={this.onClose}
                >
                    <h3>{this.state.selectedMarker.name}</h3>
                </InfoWindow>

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_MAPS_API_KEY
})(MainEarthquakeMap);
