import React, {useEffect, useState, useRef} from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {v4 as uuid} from 'uuid'
import './styles.css';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const hoursDisplayed = useRef([]);
    const midnightHours = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am"];
    const afternoonHours = ["12pm", "1pm", "2pm", "3pm", "4pm", "5pm" , "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]
                    
    const encode = (location) => {
        return encodeURIComponent(location)
    }

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '908af369abmsh40faa81094928ecp1b23e0jsne2a440d41836',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        
        fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + encode("san francisco"), options)
            .then(response => response.json())
            .then((results) => {
                console.log(results);
                setWeatherData(results); 
            })
            .catch(err => console.error(err));
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
                <h1 className="cityName">
                    {weatherData ?  weatherData.location.name : ""}
                </h1>
                <h2 className="temperature">
                    {weatherData ?  weatherData.current.temp_f : ""} &#8457;
                </h2>
                <h3 className="condition">
                    {weatherData ?  weatherData.current.condition.text : ""}    
                </h3>
                {weatherData ? 
                        <img src={weatherData.current.condition.icon} className="conditionIcon"/> 
                        : ""}
                <div className="high_low">
                    <p className="high">
                        High: {weatherData ?  weatherData.forecast.forecastday[0].day.maxtemp_f : ""} &#8457;    
                    </p>
                    <p className="low">
                        Low: {weatherData ?  weatherData.forecast.forecastday[0].day.mintemp_f  : ""} &#8457;
                    </p>
                </div>
            </section>

            <section className="allHourlyTemp">
                <h4 className="hourlyTitle">
                    <AccessTimeIcon fontSize={"small"}/> Hourly Temperature for the day.
                </h4>
                {hourlyWeather ? hourlyWeather.map((hour, i) => {
                    return(
                        <div className="hourlyContainer" key={uuid()}>
                            <p className="hourlyTime">
                                {hoursDisplayed.current[i]}
                            </p>
                            <img className="hourlyConditionImage" src={hour.condition.icon}/>
                            <p className="hourlyTemp">
                                {hour.temp_f} &#8457;
                            </p>
                        </div>
                    )
                }) : ""}
            </section>

         
        </main>
    )
}

export default App;