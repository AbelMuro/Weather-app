import React from 'react';
import "./styles.css";

function OtherData({weatherData}) {
    return(
        <>
        <div className="UVindex">
            <p className="titleData">
                UV Index
            </p>
            <p>
                {weatherData.current.uv} 
            </p>
        </div>
        <div className="sunrise_sunset">
            <p className="titleData">
                Sunrise
            </p>
            <p>
                {weatherData.forecast.forecastday[0].astro.sunrise}
            </p>
            <p> 
                Sunset : {weatherData.forecast.forecastday[0].astro.sunset}
            </p>
        </div>    
        <div className="wind_mph">
            <p className={"titleData"}>
                Wind
            </p>
            <p>
                {weatherData.current.wind_mph}mph
            </p>
            <p>
                {weatherData.current.wind_dir}
            </p>
        </div>    
        <div className="precipitation">
            <p className="titleData">
                Precipitation
            </p>
            <p>
                {weatherData.current.precip_in}"
            </p>
        </div>
        <div className="humidity">
            <p className="titleData">
                Humidity
            </p>
            <p>
                {weatherData.current.humidity}%
            </p>
        </div>
        <div className="pressure">
            <p className="titleData">
                Pressure
            </p>
            <p>
               {weatherData.current.pressure_in}  
            </p>
        </div>
        </>

    )
}

export default OtherData;