import React from 'react';
import UserInput from './UserInput';
import WeatherData from './WeatherData';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import "./styles.css";


function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserInput />}/>    
                <Route path="/:cityname" element={<WeatherData/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;