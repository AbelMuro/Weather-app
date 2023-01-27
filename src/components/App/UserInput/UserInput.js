import React, {useState} from 'react';
import {TextField, Button} from '@mui/material';
import {styled} from "@mui/system";
import {useNavigate} from 'react-router-dom';
import "./styles.css";

const StyledButton = styled(Button)`
    background-color: blue;
    color: white;
    margin-top: 10px;

    & :hover{
        background-color: darkblue;
        color: blue;
    }

    & :active{
        background-color: grey;
    }
`

function UserInput() {
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLocation(e.target.value);
    }

    const handleClick = () => {
        console.log(location)
        navigate(`/${location}`, {state: {data: location}});
    }

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
            <TextField value={location} onChange={handleChange} label={"Enter City"} />
            <StyledButton onClick={handleClick}> 
                Submit
            </StyledButton>
        </div>
    )
}

export default UserInput;