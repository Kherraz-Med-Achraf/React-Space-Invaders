import ShipImg from '../../Assets/ShipImg/ship.png';
import {SFX} from "../SFX";


export class Ship {

    constructor({getOverlappingBullet, removeBullet}) {
        this.el = document.createElement('img')
        this.el.src = ShipImg
        this.el.className = "ship"
        this.setX(document.querySelector(".game_window").offsetWidth/2);
        this.setY(document.querySelector(".game_window").offsetHeight - 100);
        document.querySelector('.game_window').append(this.el);
        this.speed = 5;
        this.canFire = true;
        this.sfx = new SFX();
        this.getOverlappingBullet = getOverlappingBullet;
        this.removeBullet = removeBullet;
        this.isAlive = true

    }

    //##########################  Entity position #########################################
    setX = (x) => {
        this.x = x
        this.el.style.left = `${x}px`;
    }
    setY = (y) => {
        this.y = y
        this.el.style.top = `${y}px`
    }

    //################################### ship Movement ###################################################

    moveRight = () => {
        if (!this.isAlive) return;
        this.setX(this.x + this.speed);
    }

    moveLeft = () => {
        if (!this.isAlive) return;
        this.setX(this.x - this.speed);
    }

    //################################### ship Fire ###################################################


    fire = ({creatBullet}) => {
        if (this.canFire && this.isAlive){
            this.canFire = false;
            creatBullet ({
                x: this.x + 43,
                y: this.y,
                nomDeClassCSS: "bullet"
            });

            this.sfx.fireAudioFonction()

            setTimeout(()=>{
                this.canFire = true;
            },500);
        }

    }

    //################################### ship damage ###################################################

    shipUpdate = () => {

        const bulletHit = this.getOverlappingBullet(this);
        if (bulletHit && bulletHit.isAlien && this.isAlive) {
            this.sfx.shipExplosionFonction()
            this.removeBullet(bulletHit)
            this.kill()
        }
    }

    spawn = () => {
        this.isAlive = true;
        this.el.style.opacity = 1;
        this.setX(document.querySelector(".game_window").offsetWidth/2);
        this.setY(document.querySelector(".game_window").offsetHeight - 100);
    }

    kill = () => {
        this.isAlive = false;

        setTimeout (() => {
            this.spawn()
        }, 3000)
        this.el.style.opacity = 0;
    }



}