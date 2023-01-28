import React, {useState, useEffect} from 'react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import StylingMap from './StylingMap';
import "./styles.css";

function Map({lat, long, deg}) {
    const [map, setMap] = useState();
    const google_api_key = process.env.google_api;
    const {isLoaded} = useLoadScript({  
        googleMapsApiKey: google_api_key,
    });

    useEffect(() => {
        if(!map) return;
        let marker = new google.maps.Marker({                                   
            position: {lat: lat, lng: long},                                      
            map: map,                                                           
            title: `${Math.floor(deg)}°F`,
            label: {color: "white", fontSize: "10px", text: `${Math.floor(deg)}°F`,}                           
        })
    }, [map])

    return isLoaded ? (
        <GoogleMap
            mapContainerClassName="map"
            zoom={10}
            onLoad={(map) => {setMap(map)}}
            center={{lat: lat, lng: long}}
            options={{
                zoomControl: false,
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                styles: StylingMap
            }}>
        </GoogleMap>
    ) : (<></>)
}

export default Map;