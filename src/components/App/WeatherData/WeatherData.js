import React, {useEffect, useState, useRef, memo} from 'react';
import CityData from './CityData';
import HourlyTemp from "./HourlyTemp";
import Map from './Map';
import OtherData from './OtherData';
import {useLocation, useNavigate} from 'react-router-dom';
import './styles.css';
import clouds from './images/clouds background.jpg';

function WeatherData() {
    const [weatherData, setWeatherData] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const {state} = useLocation();
    const navigate = useNavigate();
    const hoursDisplayed = useRef([]);
    const midnightHours = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am"];
    const afternoonHours = ["12pm", "1pm", "2pm", "3pm", "4pm", "5pm" , "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]
                    
    const encode = (location) => {
        return encodeURIComponent(location)
    }

    useEffect(() => {
        const api_key = process.env.api_key;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': api_key,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + encode(state.data), options)
            .then(response => response.json())
            .then((results) => {
                if(results?.error) {
                    alert("Please enter a valid city")
                    navigate("/");
                    return;
                }
                console.log(results);
                const body = document.querySelector("body");
                body.style.backgroundImage = `url('${clouds}')`;
                setWeatherData(results); 
            })
    }, [])


    useEffect(() => {
        if(!weatherData) return;
        const date = new Date();
        const currentHour = date.getHours();

        if(currentHour <= 12){
            hoursDisplayed.current = midnightHours;
            const temp = weatherData.forecast.forecastday[0].hour;
            setHourlyWeather(temp.slice(0, 12));
        }
            
        else {
            hoursDisplayed.current = afternoonHours;
            const temp = weatherData.forecast.forecastday[0].hour;
            setHourlyWeather(temp.slice(12, 24));
        }
        
    }, [weatherData])


    return(
        <main className="container">
            <section className="currentTemp">
                {weatherData ? <CityData weatherData={weatherData}/> : ""}
            </section>

           <section className="hourlyTemp_and_map">
                <div className="allHoursTemperature">
                    <HourlyTemp hoursDisplayed={hoursDisplayed.current} hourlyWeather={hourlyWeather}/>
                </div>
                <div className="mapContainer">
                    {weatherData ? <Map lat={weatherData.location.lat} long={weatherData.location.lon} deg={weatherData.current.temp_f}/> : "" }
                </div>            
           </section>

            <section className="otherWeatherData">
                {weatherData ? <OtherData weatherData={weatherData}/> : ""}
            </section>           
        </main>
    )
}

export default memo(WeatherData);