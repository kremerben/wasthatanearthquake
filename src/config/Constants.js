/** Constants **/

/** Auburn, CA **/
export const DEFAULT_LATITUDE = 38.9;
export const DEFAULT_LONGITUDE = -121.1;

export const TIME_FRAME_CHOICES = {
    hour: "In the past hour",
    day: "Earlier Today",
    week: "This past week",
};

export const USGS_BASE_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/";
export const USGS_HOUR_URL = USGS_BASE_URL + "1.0_hour.geojson";
export const USGS_DAY_URL = USGS_BASE_URL + "1.0_day.geojson";
export const USGS_WEEK_URL = USGS_BASE_URL + "1.0_week.geojson";

export const GOOGLE_MAPS_API_KEY = "AIzaSyDy-JqylpwpC21oUjNRkuCt-5mPSx8uZhs";
