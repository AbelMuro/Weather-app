import React, {useState} from 'react';

function UserInput() {
    const [location, setLocation] = useState("");

    const handleChange = (e) => {
        setLocation(e.target.value);
    }

    return(
        <div className="inputContainer">
            <h1 className="title">
                Weather App
            </h1>
            <p className="desc">
                This app will display the weather data of a particular city.
            </p>
            <input value={location} onChange={handleChange} />
        </div>
    )

}