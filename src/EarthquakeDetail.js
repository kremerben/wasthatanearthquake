import React, { Component } from "react";
import {GOOGLE_MAPS_API_KEY} from "./config/Constants";


class EarthquakeDetail extends Component {
    constructor(props) {
        super(props);
    }


render() {
    let data = this.props.value.properties;
    let totalMinutesAgo = Math.floor((Date.now() - data.time) / 60000);
    let hourAgo = Math.floor(totalMinutesAgo / 60);
    let minutesAgo = (totalMinutesAgo % 60).toFixed();

    let coords = this.props.value.geometry;
    let depth = coords.coordinates[2];
    let eq_longitude = coords.coordinates[0];
    let eq_latitude = coords.coordinates[1];
    let distanceFrom = Math.round(coords.distanceFromYou);

    let eqDetail = hourAgo ? `${hourAgo} hours and ` : "";
    eqDetail += `${minutesAgo} minutes ago, located ${distanceFrom} km from you, \n`;
    eqDetail += `${data.place}, at a depth of ${depth} km, and a Magnitude of ${data.strength}.`;

    let googleMapImg = `https://maps.googleapis.com/maps/api/staticmap?zoom=7&center=${eq_latitude},${eq_longitude}&markers=color:red|label:1|${eq_latitude},${eq_longitude}&size=380x200&maptype=roadmap&key=${GOOGLE_MAPS_API_KEY}`;
    let googleMapStyle = {
        display: "none",
        opacity: 1,
    };

    return (
    <li className="viewmap">
        <h3>{eqDetail}</h3>
        <button>Toggle map</button>
        <div style={googleMapStyle} className="maps1">
            <a href={data.equrl} target="_blank">
                <img src={googleMapImg} />
            </a>
        </div>
    </li>
    );}
}

export default EarthquakeDetail;
