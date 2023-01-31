import React from 'react';
import UserInput from './UserInput';
import WeatherData from './WeatherData';
import NavigationBar from './NavigationBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './../Store';
import "./styles.css";



function App() {
    return(
        <Provider store={store}>
            <BrowserRouter>
            <NavigationBar/>
                <Routes>
                    <Route path="/" element={<UserInput />}/>    
                    <Route path="/:cityname" element={<WeatherData/>} />
                </Routes>
            </BrowserRouter>        
        </Provider>

    )
}

export default App;