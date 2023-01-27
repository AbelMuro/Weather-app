import React, {useState} from 'react';
import UserInput from './UserInput';
import WeatherData from './WeatherData';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


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