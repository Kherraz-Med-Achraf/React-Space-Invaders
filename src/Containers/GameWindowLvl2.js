import React, {useState,useEffect} from 'react';
import {Ship} from "../Component/Ship/Ship";
import {Bullet} from "../Component/Bullet/Bullet";
import {SFX} from "../Component/SFX";
import {Alien} from "../Component/Alien/Alien";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'
import Score from "../Component/Score/Score";
import './GameWindow.css';
import '../Component/Ship/Ship.css'
import '../Component/Bullet/Bullet.css'
import '../Component/Alien/Alien.css'
import '../Component/Score/Score.css'
import '../Component/Lives/Lives.css'
import shipLive from '../Assets/ShipImg/ship.png'


const Audio = new SFX();


function GameWindowLvl2(props) {

    const play = () => {
        if (toggle) {
            Audio.music.play();
            Audio.music.loop = true;
        }else {
            Audio.music.pause()
        }
        setToggle(!toggle);
    }



    //################################### Audio Initialisation ###################################################

    const [toggle, setToggle] = useState(true);



    //################################### Nav Initialisation ###################################################

    const nav = useNavigate();

    const navigate = useNavigate();
    const Quitter = () => {
        navigate('/home');
    }

    //################################### Redux Initialisation ###################################################


    const dispatch = useDispatch();

    const incrFunction = () => {
        dispatch({
            type: "INCR"  //nom de l'action
        })
    }
    const decrFunction = () => {
        dispatch({
            type: "DECR"  //nom de l'action
        })
    }


    useEffect(()=>{

        //###################################  const and fonctions Initialisation ###################################################

        const gameOver = () => {
            clearInterval(interval);
            clearInterval(fireInterval);
            aliens.forEach(alien => {
                alien.remove()
            })
            nav('/gameover');
        }

        const lvl = 2  //pour changer le type d'alien entre les niveaux

        const item = document.querySelector(".game_window");
        const style = getComputedStyle(item) //renvoie toutes les propriteés CSS
        let min_x =parseInt(style.marginLeft) //avoir le bord gauche
        let max_x = document.body.offsetWidth - min_x - 200 // avoir le bord droite
        let max_y = item.offsetHeight // avoir la hauteur max

        //###################################  Detect collision ###################################################

        const isOverlapping = (element1, element2) => {
            //code source :https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements
            //pour savoir si deux element du dom se superposent
            const rect1 = element1.el.getBoundingClientRect();
            const rect2 = element2.el.getBoundingClientRect();

            return !(rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom)
        }

        const getOverlappingBullet = (entity) => { //fonction qui permet de savoir si deux entity se touchent
            for (let bullet of bullets) {
                if (isOverlapping(entity, bullet)) {
                    return bullet
                }
            }return null;
        }

        const getOverlappingAliens = (entity) => { //fonction qui permet  de savoir si deux entity se touchent
            for (let alien of aliens) {
                if (isOverlapping(entity, alien)) {
                    return alien
                }
            }return null;
        }

        //################################### Bullets Initialisation ###################################################


        const bullets = [];
        const creatBullet = ({x,y,nomDeClassCSS, isAlien = false}) => { //fonction pour créer des tires
            bullets.push(new Bullet ({
                x,
                y,
                nomDeClassCSS,
                isAlien
            }));
        }

        const removeBullet = (bullet) => {  //supprimer un tir
            bullets.splice(bullets.indexOf(bullet),1);
            bullet.remove()
            if (bullet.isAlien){   //si le tir touche le vaissaus
                decrFunction();
                shipHits();
            }else {
                incrFunction(); //si le tir touche le vaisseaux
                win();
            }

        };

        //################################### ship Initialisation ###################################################

        const ship = new Ship({
            getOverlappingBullet,
            getOverlappingAliens,
            gameOver,
            removeBullet
        });

        const shipHits = () => {   // si le ship est touché
            let life = document.querySelectorAll(".ship-lives")
            if (life.length > 1){
                life[life.length-1].remove()
            }
            else {
                nav('/gameover');
                clearInterval(fireInterval);
            }
        }

        //################################### Aliens Initialisation ###################################################

        const removeAlien = (alien) => {    //supprimer un alien
            aliens.splice(aliens.indexOf(alien),1); //supprimer un element d'un tableau
            alien.remove();
        };


        const aliens = [];  //création des aliens sous forme de tableau
        let conteur = 0;
        let Alien_Raws = 3; // definition du nombre de ligne d'aliens

        for (let row = 0; row < Alien_Raws  ; row ++) {
            for (let col = 0 ; conteur < max_x ; col++) {
                const alien = new Alien({
                    x: min_x + 120 * col ,
                    y: row * 100 + 10,
                    getOverlappingBullet,
                    removeAlien,
                    removeBullet,
                    lvl
                });

                conteur = min_x + 120 * col ;
                aliens.push(alien);
                // alienCol.push(alien); //TA

            }
            conteur = 0;
            // alienGrid.push(alienCol);//TA
        }


        const getLeftMostAlien = () => {
            return aliens.reduce((minimumAlien, currantAlien) => {
                return currantAlien.x < minimumAlien.x ? currantAlien : minimumAlien;
            });
        };
        const getRightMostAlien = () => {
            return aliens.reduce((maximumAlien, currantAlien) => {
                return currantAlien.x > maximumAlien.x ? currantAlien : maximumAlien;
            });
        };


        //################################### ship Control ###################################################

        const keys = {
            d:false,
            q:false,
            ' ':false,
        }
        const ChangeAll = () => {
            ship.sfx.changeFonction()
            aliens.forEach(alien => {
                alien.sfx.changeFonction()
            });

            bullets.forEach(bullet => {
                bullet.sfx.changeFonction()
            });
        }

        window.addEventListener('keydown', e => {
            keys[e.key] = true;
            if (e.key === 'm') {
                ChangeAll()
            }
        })

        const Audio = document.querySelector('#audio')
        Audio.addEventListener('click', ()=> {
            ChangeAll()
        })

        window.addEventListener('keyup', e => {
            keys[e.key] = false;
        })

        const interval = setInterval(() => {

            if (keys['d'] && ship.x < document.querySelector(".game_window").offsetWidth - 90 ) {
                ship.moveRight()

            }
            if (keys['q'] && ship.x >  5) {
                ship.moveLeft()

            }
            if (keys[' ']) {
                ship.fire({creatBullet}); //on passe une fonction a notre class
            }

            ship.shipUpdate()

            //################################### Bullet hors zone detect ###################################################

            bullets.forEach(bullet => {
                bullet.move();
                if (bullet.y < 50 || bullet.y > max_y - 50) {   //quand le tir sort de l'écran
                    bullet.remove();
                    bullets.splice(bullets.indexOf(bullet),1);//supprimer un element du tableau bullets
                }
            });


            //################################### Alien Control ###################################################

            aliens.forEach(alien => {
                alien.update()
            })


            const maxLeftAlien = getLeftMostAlien();

            if (maxLeftAlien.x <  min_x) {
                aliens.forEach(alien => {
                    alien.setDirectionRight()
                })
            }

            const maxRightAlien = getRightMostAlien();
            if (maxRightAlien.x > document.body.offsetWidth - min_x - 100) {
                aliens.forEach(alien => {
                    alien.setDirectionLeft()
                })
            }

            aliens.forEach(alien => {
                if ( alien.y > max_y - 67) {   //quand l'alien sors de l'ecran
                    gameOver()
                }
            });

        }, 20);

        aliens.forEach(alien => {
            alien.moveDown()
        })


        // //###################################### Alien fire Random #############################################

        const fireInterval = setInterval (() => { //alien qui tire randome
            let alien = aliens[Math.floor(Math.random()*aliens.length)]; //pour choisir un alien random
            alien.fireAlien({creatBullet});
        }, 350)


        const win = () => {
            if (aliens.length === 0) {
                nav('/gameover');
            }
        }


        return () => {
            clearInterval(interval);
            clearInterval(fireInterval);
        }
    },[])



    return (
        <>
            <button id='audio' className='buttonGame' onClick={()=>{
                play()
            }}>Audio</button>
            <button className='buttonGame' id='Quitter' onClick={Quitter}>Quitter</button>
            <div className='game_window' >
                <Score/>
                <div className="Lives">
                    <h2>Vie: </h2>
                    <img src={shipLive} alt="" className="ship-lives"/>
                    <img src={shipLive} alt="" className="ship-lives"/>
                    <img src={shipLive} alt="" className="ship-lives"/>
                </div>
            </div>

        </>

    );
}




export default GameWindowLvl2;