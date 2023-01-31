import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {TextField, Button} from '@mui/material';
import {styled} from "@mui/system";
import {useNavigate} from 'react-router-dom';
import "./styles.css";

const StyledButton = styled(Button)`
    background-color: blue;
    color: white;
    margin-top: 10px;

    &: hover{
        background-color: darkblue;
    }

    &: active{
        background-color: rgb(0, 0, 124);
    }
`

const StyledInput = styled(TextField)`
    background-color: white;

`

function UserInput() {
    const [location, setLocation] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLocation(e.target.value);
    }

    const handleClick = () => {
        navigate(`/${location}`, {state: {data: location}});
    }

    useEffect(() => {
        dispatch({type: "set", background_color: "black", text_color: "lightblue"})
    }, [])


    return(
        <div className="inputContainer">
            <h1 className="title">
                Weather App
            </h1>
            <p className="desc">
                This app will display the weather data of a particular city. 
                Please enter in one of the following formats: <br/><br/>
                1. city, state, country <br/>
                2. city, state <br/>
                3. city <br/>
            </p>
            <StyledInput value={location} onChange={handleChange} label={"Enter City"} />
            <StyledButton onClick={handleClick}> 
                Submit
            </StyledButton>
        </div>
    )
}

export default UserInput;