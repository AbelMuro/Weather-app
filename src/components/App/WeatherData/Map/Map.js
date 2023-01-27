import React, {useState} from 'react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import StylingMap from './StylingMap';
import "./styles.css";

function Map({lat, long, deg}) {
    const [map, setMap] = useState();
    const google_api_key = process.env.google_api;
    const {isLoaded} = useLoadScript({  
        googleMapsApiKey: google_api_key,
    });


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
                <Marker icon={{
                    url: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${deg}°F|FF0000|000000`,        //this is where i left off
                    scaledSize: new google.maps.Size(50, 70),
                }} position={{lat: lat, lng: long}}>

                </Marker>
        </GoogleMap>
    ) : (<></>)
}

export default Map;