import React, {useEffect, useState, memo} from 'react';
import {useDispatch} from 'react-redux';
import CityData from './CityData';
import HourlyTemp from "./HourlyTemp";
import Map from './Map';
import OtherData from './OtherData';
import {useLocation, useNavigate} from 'react-router-dom';
import './styles.css';
import images from './images';

function WeatherData() {
    const [weatherData, setWeatherData] = useState(null);
    const dispatch = useDispatch();
    const {state} = useLocation();
    const navigate = useNavigate();
                    
    const encode = (location) => {
        return encodeURIComponent(location);
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
                console.log(results)
                setWeatherData(results); 
            })
    }, [])

    useEffect(() => {
        if(!weatherData) return;

        const condition = weatherData.current.condition.text.toLowerCase();
        const is_day = weatherData.current.is_day;
        const body = document.querySelector("body");
        const boxColor = document.querySelectorAll(".background_color");

 
        //if its cloudy in any way
        if(condition.includes("cloud") || condition.includes("overcast")){
            body.style.backgroundImage = is_day ? `url('${images["dayClouds"]}')` : `url('${images["nightClouds"]}')`;     
            body.style.backgroundColor = is_day ? "#81add4" : "#060a15";
            boxColor.forEach((box) => {
                box.style.backgroundColor = is_day ? "#3376e4" : "#001f75";
                box.style.color = is_day ? "black" : "white";
            })
            dispatch({type: "set", background_color: boxColor[0].style.backgroundColor, text_color: "black"})
        }

        //if it rains in any way
        else if(condition.includes("rain") || condition.includes("thunder") || 
                condition.includes("drizzle") || condition.includes("shower") ||
                condition.includes("hail")){
            body.style.backgroundImage = `url('${images["rain"]}')`; 
            body.style.color = "white";  
            body.style.backgroundColor = "#2b2c2c";
            boxColor.forEach((box) => {
                box.style.backgroundColor = "#707071";
            })
            dispatch({type: "set", background_color: boxColor[0].style.backgroundColor, text_color: "white"})
        }
                                       
        //if its clear in any way
        else if(condition.includes("sun") || condition.includes("clear")){
            body.style.backgroundImage = is_day? `url('${images["sunny"]}')` : `url('${images["night"]}')`;  
            body.style.color = is_day ? "black" : "white";
            body.style.backgroundColor = is_day ? "#8fceed" :  "#1a243b";
            boxColor.forEach((box) => {
                box.style.backgroundColor = is_day ? "#3376e4" : "#3b435f";
            })
            dispatch({type: "set", background_color: boxColor[0].style.backgroundColor, text_color: body.style.color})
        }
            
        //if its foggy in any way
        else if (condition.includes("fog") || condition.includes("mist")){
            body.style.backgroundImage = `url('${images["fog"]}')`;
            body.style.backgroundColor = "#dadada";
            boxColor.forEach((box) => {
                box.style.backgroundColor = "#b4b4b4";
            })
            dispatch({type: "set", background_color: boxColor[0].style.backgroundColor, text_color: "black"})
        }
            
        return () => {
            body.style.backgroundImage = "";
            body.style.color = "";
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
                    {weatherData ? <HourlyTemp weatherData={weatherData}/> : ""}
                </div>
                <div className="mapContainer background_color">
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