import axios from "axios";


export async function findCoordinates() {
    if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(
            position => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                // this.setState({
                //     user_location:location
                // });
                return {
                    user_location: location
                };
            },
            error => {
                console.log(error);
                // geofail.then((ipBasedLocation) => this.setState({
                //     location: ipBasedLocation
                // }));
            }, {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }
}

let geofail = new Promise(
    function(resolve, reject) {
        const IPAPIurl = "https://ipapi.co/json/";

        axios.get(IPAPIurl).then(result => {
            const location = {
                latitude: result.data.latitude,
                longitude: result.data.longitude
            };
            if (location) {
                resolve(location);
            } else {
                const sorry = "Sorry, your browser does not support geolocation services.";
                console.log(sorry);
                reject(sorry);
            }
        })
    });
