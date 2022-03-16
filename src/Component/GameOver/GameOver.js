import React from 'react';
import './GameOver.css';
import {useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import ReplayImg from '../../Assets/Gui/Replay.png'
import HomeImg from '../../Assets/Gui/Home.png'

function GameOver(props) {

    const score = useSelector(state => state.score)

    function refreshPage() {
        window.location.reload(false);
    }

    const nav = useNavigate();
    const goToHome = () => {
        nav('/home');
        refreshPage()
    }
    const goToGame = () => {
        nav('/game');
        refreshPage()
    }

    return (
        <div className="GameOver">
            <h1>Game Over !</h1>
            <h1>Votre Score : {score}</h1>
            <div className="choice">
                <img onClick={goToGame} src={ReplayImg} alt=""/>
                <img onClick={goToHome} src={HomeImg} alt=""/>
            </div>

        </div>
    );
}

export default GameOver;