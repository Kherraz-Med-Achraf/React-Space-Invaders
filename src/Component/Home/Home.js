import React, {useEffect} from 'react';
import './Home.css'
import {useNavigate} from 'react-router-dom'


function Home(props) {

    const nav = useNavigate();
    const goTo = () => {
        nav('/game');
    }
    const goResponsive = () => {
        nav('/responsive')
    }
    const responsive = window.innerWidth;
    useEffect(()=>{

        console.log(responsive)
        if (responsive < 1280) {
            goResponsive()
        }
    },[responsive])





        return (
            <div className="Home">
                <h1>Projet React SpaceInvader !</h1>
                <button onClick={goTo}>Start</button>
            </div>
        );

}

export default Home;