import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux"; //Provider = celui qui apporte // on entoure notre application avec
//c'est lui qui qui apporte les données a notre application depuis le store
import ScoreReducer from "./Redux/Reducers/ScoreReducer";


const Store = createStore(ScoreReducer);


ReactDOM.render(
    <BrowserRouter>
        <Provider store={Store}>
            <App />
        </Provider>
    </BrowserRouter>,


  document.getElementById('root')
);

