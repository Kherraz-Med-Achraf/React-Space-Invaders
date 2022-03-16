import React from 'react';
import './Home.css'
import {useNavigate} from 'react-router-dom'
import StartImg from '../../Assets/Gui/StartPlay_0035_Package-----------------.png'

function Home(props) {


    const nav = useNavigate();
    const goTo = () => {
        nav('/game');
    }

        return (
            <div className="Home">
                <h1>Projet React</h1>
                <h1>SpaceInvader !</h1>
                <img onClick={goTo} src={StartImg} alt=""/>
            </div>
        );

}

export default Home;