import './App.css';
import {Routes, Route} from "react-router-dom";
import BG from './Assets/Background/bg.mp4'
import Home from "./Component/Home/Home";
import GameWindow from "./Containers/GameWindow";
import GameOver from "./Component/GameOver/GameOver";



function App() {


  return (
    <>
        <video className='BG' autoPlay loop muted>
            <source src={BG} type='video/mp4' />
        </video>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/game" element={<GameWindow/>}/>
            <Route path="/gameover" element={<GameOver/>}/>
        </Routes>
    </>
  );
}

export default App;
