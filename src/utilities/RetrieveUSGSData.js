import axios from "axios";
import {
    USGS_DAY_URL,
    USGS_HOUR_URL,
    USGS_WEEK_URL
} from "../config/Constants";


const timeFrameMapping = {
    hour: USGS_HOUR_URL,
    day: USGS_DAY_URL,
    week: USGS_WEEK_URL,
};


export function retrieveUSGSData(timeFrame) {

    return axios.get(timeFrameMapping[timeFrame]).then(result => {
        // filter out anything below mag 1.5
        result.data.features = result.data.features.filter(function(eq) {
            return eq.properties.mag >= 1.5;
        });
        return result.data.features
    });
}
