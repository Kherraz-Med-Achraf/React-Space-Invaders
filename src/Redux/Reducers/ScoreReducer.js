const INITIAL_STATE = {
    score: 0 //state initial
}

function ScoreReducer(state = INITIAL_STATE, action) {


    switch (action.type) {
        case 'INCR' : {
            return {
                ...state,  //on copie le state actuel
                score: state.score + 10  //on modifie le nouveau state actuel

            }
        }
        case 'DECR' : {
            return {
                ...state,  //on copie le state actuel
                score: state.score - 50  <= 0 ? 0 : state.score - 50  //on modifie le nouveau state actuel

            }
        }
    }

    return state;
}

export default ScoreReducer;