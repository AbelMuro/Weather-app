import React from "react";
import "./styles.css";

function CityData({weatherData}) {
    return(
        <>
            <h1 className="cityName">
                {weatherData.location.name}
            </h1>
            <h2 className="temperature">
                {weatherData.current.temp_f} &#8457;
            </h2>
            <h3 className="condition">
                {weatherData.current.condition.text}    
            </h3>
            <img src={weatherData.current.condition.icon} className="conditionIcon"/> 
            <div className="high_low">
                <p className="high">
                    High: {weatherData.forecast.forecastday[0].day.maxtemp_f} &#8457;    
                </p>
                <p className="low">
                    Low: {weatherData.forecast.forecastday[0].day.mintemp_f} &#8457;
                </p>
            </div>
        </>)
}

export default CityData;