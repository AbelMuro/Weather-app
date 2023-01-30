import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AdjustIcon from '@mui/icons-material/Adjust';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import AirIcon from '@mui/icons-material/Air';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import WavesIcon from '@mui/icons-material/Waves';
import SpeedIcon from '@mui/icons-material/Speed';
import {styled} from '@mui/system';
import React, { useEffect } from 'react';
import images from './images';
import "./styles.css";


const StyledArrow = styled(ArrowDropDownIcon)`
    position: absolute;
    left: -14px;
    bottom: -23px;
`

const StyledAdjust = styled(AdjustIcon)`
    position: absolute;
    top: -20px;
    left: -6px;
`

function OtherData({weatherData}) {

    function determineRisk(){
        const UVindex= weatherData.current.uv;
        console.log(UVindex);

        if(0 <= UVindex && UVindex <= 2.9){
            return(<p>Low</p>)
        }
        else if(3 <= UVindex && UVindex <= 5.9){
            return(<p>Medium</p>)
        }
        else if(6 <= UVindex && UVindex <= 7.9){
            return(<p>High</p>)
        }
        else if(8 <= UVindex && UVindex <= 10.9){
            return(<p>Very High</p>)
        }
        else if(11 <= UVindex){
            return(<p>Extremely High</p>)
        }
    }

    useEffect(() => {
        const UVindex = weatherData.current.uv;
        const indexDot = document.querySelector(".index");

        if(UVindex <= 10)
            indexDot.style.left = Number(UVindex + "0") + "%";
        else    
            indexDot.style.left = "100%";    
    },[])

    useEffect(() => {
        const arrow = document.querySelector(".arrow");
        arrow.style.transform = `translate(-50%, -50%) rotate(${weatherData.current.wind_degree}deg)`;
    })


    return(
        <>
        <div className="UVindex background_color">
            <p className="titleData">
                <WbSunnyIcon/> 
                <p>UV Index</p>
            </p>
            <p>
                {weatherData.current.uv} 
            </p>
            {determineRisk()} 
            <div className="UVbar">
                <div className="index"></div>
                <img src={images["green_to_yellow"]} className="barColor"/>
                <img src={images["yellow_to_red"]} className="barColor"/>
                <img src={images["red_to_purple"]} className="barColor"/>
            </div>

        </div>
        <div className="sunrise_sunset background_color">
            <p className="titleData">
                <WbTwilightIcon/>
                <p>Sunrise</p>
            </p>
            <p>
                {weatherData.forecast.forecastday[0].astro.sunrise}
            </p>
            <p> 
                Sunset:&nbsp;
                <span>
                    {weatherData.forecast.forecastday[0].astro.sunset}
                </span> 
            </p>
        </div>    
        <div className="wind_mph background_color">
            <p className="titleData">
                <AirIcon/>
                <p>Wind</p>
            </p>
            <div className="compassWrapper">
                <div className="compass">
                    <p>N</p>
                    <p>W</p>
                    <p className="background_color">
                        {Math.round(weatherData.current.wind_mph)}<br/>mph
                    </p>
                    <p>E</p>                    
                    <p>S</p>
                    <div className="arrow">
                        <StyledArrow fontSize="large"/>
                        <StyledAdjust fontSize="small"/>                   
                    </div>
                </div>
            </div>
            <p>
                Wind Direction: {weatherData.current.wind_dir}
            </p>
        </div>    
        <div className="precipitation background_color">
            <p className="titleData">
                <InvertColorsIcon/>
                <p>Precipitation</p>
            </p>
            <p>
                {weatherData.current.precip_in}"
            </p>
            <p>
                in the last 24h
            </p>
        </div>
        <div className="humidity background_color">
            <p className="titleData">
                <WavesIcon/>
                <p>Humidity</p>
            </p>
            
            <p>
                {weatherData.current.humidity}%
            </p>
        </div>
        <div className="pressure background_color">
            <p className="titleData">
                <SpeedIcon/>
                <p>Pressure</p>
            </p>
            
            <p className="wind_graph">
                <p>
                    <span>{weatherData.current.pressure_in} </span>
                    <span>inHg</span> 
                </p>
                <p className="background_color">
                    Low &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;High
                </p>
            </p>
            <div className="index">
               
            </div>
        </div>
        </>

    )
}

export default OtherData;