import React from 'react';

type LocWeatState = {
    lat: number | null,
    lon: number | null,
    temp: number | null,
    feelsLike: number | null,
    weatherType: string,
    userLocation: string,
}

class LocWeat extends React.Component<{}, LocWeatState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            lat: null,
            lon: null,
            temp: null,
            feelsLike: null,
            weatherType: '',
            userLocation: '',
        }
    }

    getPos() {
        navigator.geolocation.getCurrentPosition((pos) => {
            this.setState({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
            })
        });
        setTimeout(() => this.setWeat(), 2000);
    }

    setWeat() {
        if(this.state.lat && this.state.lon) {
            const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&units=imperial&appid=${process.env.REACT_APP_APIKEY}`;
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        temp: json.main.temp,
                        feelsLike: json.main.feels_like,
                        weatherType: json.weather[0].main,
                        userLocation: json.name,
                    })
                });
        } else {
            console.warn('Unable to get location data, please approve location data access in your browser to get weather for your area.');
        }

    }

    render() {
        return (
            <div>
                <h1>Click to get weather for you area</h1>
                <button onClick={() => this.getPos()}>Get Weather</button>
                <h1>Weather in {this.state.userLocation}</h1>
                <h2>Actual Temperature in F: {this.state.temp}</h2>
                <h2>Feels Like Temperature in F: {this.state.feelsLike}</h2>
                <h2>Weather Condition: {this.state.weatherType}</h2>
            </div>
        )
    }
}

export default LocWeat;