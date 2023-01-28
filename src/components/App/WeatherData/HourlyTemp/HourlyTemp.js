import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {v4 as uuid} from 'uuid'
import "./styles.css";

function HourlyTemp({hoursDisplayed, hourlyWeather}) {
    return(
        <>
            <h4 className="hourlyTitle">
                <AccessTimeIcon fontSize={"small"}/> Hourly Temperature for the day.
            </h4>
            {hourlyWeather ? hourlyWeather.map((hour, i) => {
                return(
                    <div className="hourlyContainer" key={uuid()}>
                        <p className="hourlyTime">
                            {hoursDisplayed[i]}
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