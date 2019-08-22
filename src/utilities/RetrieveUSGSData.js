import axios from "axios";
import {
    USGS_DAY_URL,
    USGS_HOUR_URL,
    USGS_WEEK_URL
} from "../config/Constants";


const choice_mapping = {
    hour: USGS_HOUR_URL,
    day: USGS_DAY_URL,
    week: USGS_WEEK_URL,
};


function calculateDistance(user_loc, eq_loc) {
    // Haversine Formula
    const R = 6371; // Radius of the earth in km
    let diffLat = deg2rad(user_loc.latitude - eq_loc.latitude);
    let diffLon = deg2rad(user_loc.longitude - eq_loc.longitude);
    let a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
        Math.cos(deg2rad(eq_loc.latitude)) * Math.cos(deg2rad(user_loc.latitude)) *
        Math.sin(diffLon / 2) * Math.sin(diffLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function can_feel(element) {
    // Roughly based off a pdf in this presentation
    // https://www.nas.nasa.gov/assets/pdf/ams/2017/AMS_20170727_Robertson.pdf
    // most values relate to ~4 on Modified Mercalli (MM) Intensity Scale
    let mag = Math.floor(element.properties.mag);
    let dist = element.geometry.distanceFromYou;
    return (
        (9 < mag && dist < 10000) ||
        (8 === mag && dist < 3000) ||
        (7 === mag && dist < 1000) ||
        (6 === mag && dist < 400) ||
        (5 === mag && dist < 150) ||
        (4 === mag && dist < 100) ||
        (3 === mag && dist < 50) ||
        (2 === mag && dist < 15) ||
        (1 === mag && dist < 5)
    )
}

export function retrieveUSGSData(choice, user_location) {

    axios.get(choice_mapping[choice]).then(result => {
        result.data.features.map(value => {
            let eq_location = {
                latitude: value.geometry.coordinates[1],
                longitude: value.geometry.coordinates[0],
            };
            value.geometry.distanceFromYou = calculateDistance(user_location, eq_location);
            return value
        });

        // filter out anything below mag 1.5
        result.data.features = result.data.features.filter(function(eq) {
            return eq.properties.mag >= 1.5;
        });

        //  calculate and add distance
        result.data.features.sort((a, b) => (a.geometry.distanceFromYou > b.geometry.distanceFromYou) ? 1 : -1);

        this.setState({
            usgsData: result.data.features,
            could_feel: result.data.features.some(can_feel),
        });
    });
}
