import React, { Component } from "react";
import {GOOGLE_MAPS_API_KEY} from "../config/Constants";


class EarthquakeDetail extends Component {

render() {
    let data = this.props.value.properties;

    let totalMinutesAgo = Math.floor((Date.now() - data.time) / 60000);
    let hoursAgo = Math.floor(totalMinutesAgo / 60);
    let minutesAgo = (totalMinutesAgo % 60).toFixed();

    let geo = this.props.value.geometry;
    let [eq_longitude, eq_latitude, depth] = geo.coordinates;
    let distanceFrom = Math.round(geo.distanceFromYou);

    let eqDetail = hoursAgo ? `${hoursAgo} hours and ` : "";
    eqDetail += `${minutesAgo} minutes ago, located ${distanceFrom} km from you, `;
    eqDetail += `${data.place}, at a depth of ${depth} km, and a Magnitude of ${data.mag}.`;

    let googleMapURL = `https://maps.googleapis.com/maps/api/staticmap?zoom=7&center=${eq_latitude},${eq_longitude}&markers=color:red|label:1|${eq_latitude},${eq_longitude}&size=380x200&maptype=roadmap&key=${GOOGLE_MAPS_API_KEY}`;

    return (
    <li className="viewmap">
        <h3>{eqDetail}</h3>
        <input type="checkbox" defaultChecked={true} />
        <i> </i>
        <p>
            <img src={googleMapURL} alt={"google map"} />
        </p>
        <p>
            <a href={data.url} target={"_blank"} rel={"noopener noreferrer"}>
                {data.url}
            </a>
        </p>
    </li>
    );}
}

export default EarthquakeDetail;
