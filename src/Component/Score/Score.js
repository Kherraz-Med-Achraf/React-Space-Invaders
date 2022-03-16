import React from 'react';
import {useSelector} from "react-redux";

function Score(props) {

    const score = useSelector(state => state.score)



    return (
        <>
            <h1 className="score">Score : {score}</h1>
        </>
    );
}

export default Score;