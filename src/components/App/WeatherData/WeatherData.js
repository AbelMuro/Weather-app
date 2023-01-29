import React, {useEffect, useState, useRef, memo} from 'react';
import CityData from './CityData';
import HourlyTemp from "./HourlyTemp";
import Map from './Map';
import OtherData from './OtherData';
import {useLocation, useNavigate} from 'react-router-dom';
import './styles.css';
import images from './images';

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

    useEffect(() => {
        if(!weatherData) return;

        const condition = weatherData.current.condition.text.toLowerCase();
        const is_day = weatherData.current.is_day;
        const body = document.querySelector("body");
        const boxColor = document.querySelectorAll(".background_color");


        body.style.backgroundImage = `url('${images["rain"]}')`;   
        body.style.backgroundColor = "#2b2c2c";
        boxColor.forEach((box) => {
            box.style.backgroundColor = "#707071";
        })
 
        //if its cloudy in any way
        if(condition.includes("cloud") || condition.includes("overcast")){
            body.style.backgroundImage = is_day ? `url('${images["dayClouds"]}')` : `url('${images["nightClouds"]}')`;     
            body.style.backgroundColor = is_day ? "#81add4" : "#060a15";
            boxColor.forEach((box) => {
                box.style.backgroundColor = is_day ? "#3376e4" : "#001f75";
                box.style.color = is_day ? "black" : "white";
            })
        }

        //if it rains in any way
        else if(condition.includes("rain") || condition.includes("thunder")){
            body.style.backgroundImage = `url('${images["rain"]}')`;   
            body.style.backgroundColor = "#2b2c2c";
            boxColor.forEach((box) => {
                box.style.backgroundColor = "#707071";
            })
        }
                                       
        //if its clear in any way
        else if(condition.includes("sun") || condition.includes("clear")){
            body.style.backgroundImage = is_day? `url('${images["sunny"]}')` : `url('${images["night"]}')`;  
            body.style.backgroundColor = is_day ? "#8fceed" :  "#1a243b";
            boxColor.forEach((box) => {
                box.style.backgroundColor = is_day ? "#3376e4" : "#3b435f";
            })
        }
            
        //if its foggy in any way
        else if (condition.includes("fog") || condition.includes("mist")){
            body.style.backgroundImage = `url('${images["fog"]}')`;
            body.style.backgroundColor = "#dadada";
            boxColor.forEach((box) => {
                box.style.backgroundColor = "#b4b4b4";
            })
        }
            
        return () => {
            body.style.backgroundImage = "";
            body.style.backgroundColor = "";
            boxColor.forEach((box) => {
                box.style.backgroundColor = "";
            })
        }

    }, [weatherData])


    return(
        <main className="container">
            <section className="currentTemp background_color">
                {weatherData ? <CityData weatherData={weatherData}/> : ""}
            </section>

           <section className="hourlyTemp_and_map">
                <div className="allHoursTemperature background_color">
                    <HourlyTemp hoursDisplayed={hoursDisplayed.current} hourlyWeather={hourlyWeather}/>
                </div>
                {/*<div className="mapContainer background_color">
                    {weatherData ? <Map lat={weatherData.location.lat} long={weatherData.location.lon} deg={weatherData.current.temp_f}/> : "" }
                </div> */}        
           </section>

            <section className="otherWeatherData">
                {weatherData ? <OtherData weatherData={weatherData}/> : ""}
            </section>           
        </main>
    )
}

export default memo(WeatherData);