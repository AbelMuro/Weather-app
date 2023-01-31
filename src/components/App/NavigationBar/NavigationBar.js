import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Button} from "@mui/material";
import {styled} from "@mui/system";
import "./styles.css";

const StyledButton = styled(Button)`
    background-color: blue;
    color: white;
    padding: 10px;
    font-size: 10px;
    width: 70px;
    height: 25px;

    &: hover{
        background-color: darkblue
    }

    &: active{
        background-color: rgb(0, 0, 124);
    }
`

function NavigationBar() {
    const state = useSelector(state => state);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

    useEffect(() => {
        if(!state) return;

        const nav = document.querySelector(".navBar");
        const logo = nav.firstElementChild;
        nav.style.backgroundColor = state.background_color;
        logo.style.color = state.text_color;

    }, [state])

    return(
        <nav className="navBar">
            <div className="logo">
                Weather App
            </div>
            <StyledButton onClick={handleClick}>
                Go back
            </StyledButton>
        </nav>
    )
}

export default NavigationBar;