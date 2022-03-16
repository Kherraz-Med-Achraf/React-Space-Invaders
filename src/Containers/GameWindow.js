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


function GameWindow(props) {

    //################################### Audio Initialisation ###################################################

    const [toggle, setToggle] = useState(true);
    const dispatch = useDispatch();


    const play = () => {
        if (toggle) {
            Audio.music.play();
            Audio.music.loop = true;
        }else {
            Audio.music.pause()
        }
        setToggle(!toggle);
    }


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
    const nav = useNavigate();




    useEffect(()=>{



        //###################################  const and fonctions Initialisation ###################################################




        const bullets = [];
        const creatBullet = ({x,y,nomDeClassCSS, isAlien = false}) => {
            bullets.push(new Bullet ({
                x,
                y,
                nomDeClassCSS,
                isAlien
            }));
        }



        const shipHits = () => {
            let life = document.querySelectorAll(".ship-lives")
            if (life.length > 1){
                life[life.length-1].remove()
            }
            else {
                nav('/gameover');
                clearInterval(fireInterval);
            }
        }





        const aliens = [];
        // const alienGrid = []; //TA
        let conteur = 0;

        const item = document.querySelector(".game_window");
        const style = getComputedStyle(item)
        let min_x =parseInt(style.marginLeft)
        let max_x = document.body.offsetWidth - min_x - 200
        let max_y = item.offsetHeight
        let Alien_Raws = 3;
        // let Alien_Col = 0;





        const removeAlien = (alien) => {
            aliens.splice(aliens.indexOf(alien),1);
            alien.remove();
        };
        const removeBullet = (bullet) => {
            bullets.splice(bullets.indexOf(bullet),1);
            bullet.remove();
            if (bullet.isAlien){
                decrFunction();
                shipHits();
            }else {
                incrFunction();
                win();
            }

        };

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

        const getOverlappingBullet = (entity) => {
            for (let bullet of bullets) {
                if (isOverlapping(entity, bullet)) {
                    return bullet
                }
            }return null;
        }


        //################################### ship Initialisation ###################################################

        const ship = new Ship({
            getOverlappingBullet,
            removeBullet
        });

        //################################### Aliens Initialisation ###################################################

        for (let row = 0; row < Alien_Raws  ; row ++) {
            // const alienCol = []; //pour le tir alien (TA)
            for (let col = 0 ; conteur < max_x ; col++) {
                const alien = new Alien({
                    x: min_x + 120 * col ,
                    y: row * 100 + 10,
                    getOverlappingBullet,
                    removeAlien,
                    removeBullet
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
            ' ':false
        }

        window.addEventListener('keydown', e => {
            keys[e.key] = true;
            //console.log(keys)
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

            bullets.forEach(bullet => {
                bullet.move();
                if (bullet.y < 0 || bullet.y > max_y) {   //quand le tir sort de l'écran
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




        }, 20);

        aliens.forEach(alien => {
            alien.moveDown()
        })

        const fireInterval = setInterval (() => {
           let alien = aliens[Math.floor(Math.random()*aliens.length)];
           alien.fireAlien({creatBullet});
        }, 3000)

        // //###################################### Alien fire Random #############################################
        //
        // Alien_Col = alienGrid[0].length;
        // //on parcours toutes les lignes de toutes les colonnes pour determiner le plus bas
        // const getBottomAliens = () => {
        //     const bottomAliens = [];
        //     for (let col = 0 ; col < Alien_Col ; col++){
        //         for (let row = Alien_Raws - 1 ; row >= 0 ; row--){
        //             if (alienGrid[row][col]) {
        //                 bottomAliens.push(alienGrid[row][col]);
        //                 break;
        //             }
        //         }
        //     }
        //     return bottomAliens;
        // };
        //
        // const getRandomAlien = (alienList) => {
        //     return alienList[
        //         parseInt(Math.random()*alienList.length) //avoir un chiffre random depuis un array
        //         ];
        // };
        //
        // const aliensFireBullet = () => {
        //     const bottomAliens = getBottomAliens();
        //     const randomAlien = getRandomAlien(bottomAliens);
        //     //fire depuis un Alien random
        //     creatBullet({
        //         x: randomAlien.x,
        //         y: randomAlien.y,
        //         nomDeClassCSS: 'bullet-Alien',
        //         isAlien: true
        //     });
        //
        // };
        //
        // const intervalForAlienShot = setInterval (()=>{
        //     aliensFireBullet();
        // }, 3000);

        const win = () => {
            if (aliens.length === 0) {
                nav('/gameover');
            }
        }
















        return () => {
            clearInterval(interval);
            // clearInterval(intervalForAlienShot);
        }
    },[])

    return (
        <>
            <button onClick={play}>Audio</button>
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

export default GameWindow;