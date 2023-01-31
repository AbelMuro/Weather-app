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
    },[])

    //determines the angle of the .pressure_arrow element, the angle must be between 50deg and 300deg 
    useEffect(() => {
        let deg = 41.5;
        const currentPressure = weatherData.current.pressure_in.toFixed(1);

        for(let i = 28.5; i <= 31.5; i += 0.1){                         //we map the values 28.5 through 31.5 with the angles between 50deg and 300deg
            deg += 8.5;                                                 // 28.5 -> 50deg
            console.log(currentPressure == i.toFixed(1))                // 31.5 -> 300deg
            if(currentPressure == i.toFixed(1)){
                deg += "deg";
                break;
            }
        }
        console.log(deg)
        const dot = document.querySelector(".pressure_arrow");
        dot.style.transform = `rotate(${deg}) translateX(-50%)`;
    }, [])


    return(
        <section className="otherWeatherData">
            <div className="UVindex background_color">
                <p className="titleData">
                    <WbSunnyIcon/> 
                    <span>UV Index </span>
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
                    <span>Sunrise </span>
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
                    <span>Wind </span>
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
                    <span>Precipitation </span>
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
                    <span>Humidity</span>
                </p>
                
                <p>
                    {weatherData.current.humidity}%
                </p>
            </div>
            <div className="pressure background_color">
                <p className="titleData">
                    <SpeedIcon/>
                    <span>Pressure </span>
                </p>
                
                <div className="pressure_gauge">
                    <span>
                        <span>{weatherData.current.pressure_in.toFixed(1)} </span>
                        <span>inHg</span> 
                    </span>
                    <span className="background_color">
                        Low &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;High
                    </span>
                    <div className="pressure_arrow">
                        <div className="point"></div>
                    </div>
                </div>
                <div className="index"></div>
                
            </div>
        </section>

    )
}

export default OtherData;