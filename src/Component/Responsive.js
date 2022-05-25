import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

function Responsive(props) {

    const nav = useNavigate();
    const goTo = () => {
        nav('/home');
    }

    const responsive = window.innerWidth;
    useEffect(()=>{

        if (responsive > 1280) {
            goTo()
        }
    },[responsive])


    return (
        <div className='Responsive'>
            <h1>Ce jeux n'est disponible que sur Ordinateur</h1>
        </div>
    );
}

export default Responsive;