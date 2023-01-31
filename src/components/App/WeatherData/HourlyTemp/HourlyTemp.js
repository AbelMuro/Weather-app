import React, {useRef, useState, useEffect} from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {v4 as uuid} from 'uuid'
import "./styles.css";

function HourlyTemp({weatherData}) {
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const hoursDisplayed = useRef([]);
    const midnightHours = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am"];
    const afternoonHours = ["12pm", "1pm", "2pm", "3pm", "4pm", "5pm" , "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]

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
        
    }, [])


    return(
        <>
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
        </>
    )
}

export default HourlyTemp;