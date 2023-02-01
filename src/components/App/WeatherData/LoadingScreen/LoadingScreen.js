import React, {useEffect} from 'react';
import {Skeleton, Stack, useMediaQuery} from '@mui/material';
import {styled} from '@mui/system';
import "./styles.css";

const LoadingContainer = styled(Stack)`
    width: 100%;
    flex-direction: column;
    row-gap: 50px;
    margin-top: 120px;
` 

const LoadingCityData = styled(Skeleton)`
    width: 322px;
    height: 334px;
    border-radius: 20px;
    margin: auto;
`

const Loading_Map_and_HourlyTemp = styled(Skeleton)`
    width: 322px;
    height: 600px;
    margin: auto;
    border-radius: 20px;
`

const LoadingOtherData = styled(Skeleton)`
    width: 150px;
    height: 150px;
    border-radius: 20px;
`


function LoadingScreen() {
    const tablet = useMediaQuery("(min-width: 675px)");
    const desktop = useMediaQuery("(min-width: 750px)");

    useEffect(() => {
        const body = document.querySelector("body");
        body.style.backgroundImage = "url('')";
        body.style.backgroundColor = "white";

        return () => {
            body.style.backgroundColor = "";    
        }
    }, [])

    return(
        <LoadingContainer className="loadingScreen">
            <LoadingCityData variant="rectangular"/> 
            <Stack flexDirection={tablet ? "row" : "column"} columnGap={desktop ? "50px" : "10px"} rowGap="50px" sx={{margin: "auto"}}>
                <Loading_Map_and_HourlyTemp variant="rectangular" />
                <Loading_Map_and_HourlyTemp variant="rectangular"/>
            </Stack>
            <div className="loadingOtherData">
                <LoadingOtherData variant="rectangular"/>
                <LoadingOtherData variant="rectangular"/>
                <LoadingOtherData variant="rectangular"/>
                <LoadingOtherData variant="rectangular"/>
                <LoadingOtherData variant="rectangular"/>
                <LoadingOtherData variant="rectangular"/>
            </div>
            
        </LoadingContainer>
        )
}

export default LoadingScreen;
