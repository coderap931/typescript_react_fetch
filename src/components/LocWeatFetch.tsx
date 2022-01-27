import React from 'react';

type LocWeatState = {
    lat: string,
    lon: string,
    temp: number,
    feelsLike: number,
    weatherType: string,
}

class LocWeat extends React.Component<{}, LocWeatState> {
    getPos() {
        navigator.geolocation.getCurrentPosition((pos) => this.success(pos), (posErr) => this.error(posErr));
    }

    success(position: any) {
        const lat: string = position.coords.latitude;
        const lon: string = position.coords.longitude;

        this.setState({
            lat: lat,
            lon: lon,
        })
    }

    error(posErr: any) {
        console.warn(`ERROR(${posErr.code}): ${posErr.message}`);
    }

    setWeat(json: any) {
        this.setState({
            temp: json.current.temp,
            feelsLike: json.current.feels_like,
            weatherType: json.current.weather[0].main,
        })
    }

    async getWeat() {
        const url: string = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&units=imperial&appid=${process.env.REACT_APP_APIKEY}`; //APIkey possibly not passing properly?
        
        //!!!CONSOLE LOG STUFF!!!

        await window.fetch(url)
            .then(res => res.json())
            .then(json => this.setWeat(json))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getPos();
        if(this.state.temp == null){
            this.getWeat();
        }
    }

    render() {
        return(
            <div>
                <h1>Your Current Location's Weather</h1>
                <h2>{this.state.temp}</h2>
                <h2>{this.state.feelsLike}</h2>
                <h2>{this.state.weatherType}</h2>
            </div>
        )
    }
}

export default LocWeat;