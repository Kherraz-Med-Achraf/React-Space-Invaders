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
    const goToGameLvl2 = () => {
        nav('/gamelvl2');
        refreshPage()
    }

    return (
        <div className="GameOver">
            <h1>Game Over !</h1>
            <h1>Votre Score : {score}</h1>
            <div className="choice">
                <button onClick={goToGame}>Replay lvl 1</button>
                <button onClick={goToGameLvl2}>Replay lvl 2</button>
                <button onClick={goToHome}>Quitter</button>
            </div>
        </div>
    );
}

export default GameOver;