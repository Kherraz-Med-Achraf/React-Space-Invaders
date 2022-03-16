import alienImage from '../../Assets/Aliens/AngelWing_I_150x100.png'
import {SFX} from "../SFX";
const RIGHT = 'right'
const LEFT = 'left'


export class Alien {
    constructor({x , y , getOverlappingBullet , removeAlien , removeBullet}) {
        this.el = document.createElement('img')
        this.el.src = alienImage;
        this.el.className = "alien";
        this.setX(x);
        this.setY(y);
        this.speed = 0.5;
        this.DOWN_SPEED = 10;
        this.direction = LEFT;
        this.getOverlappingBullet = getOverlappingBullet;
        this.removeAlien = removeAlien;
        this.removeBullet = removeBullet;
        this.intervalAlien = '';
        this.fireInterval = '';
        this.sfx = new SFX()
        document.querySelector('.game_window').append(this.el);
    }



    setX = (x) => {
        this.x = x
        this.el.style.left = `${x}px`;
    }
    setY = (y) => {
        this.y = y;
        this.el.style.top = `${y}px`
    }

    setDirectionRight = () => this.direction = RIGHT;
    setDirectionLeft = () => this.direction = LEFT;

    update = () => {
        if (this.direction === LEFT) {
            this.setX(this.x - this.speed);
        }else {
            this.setX(this.x + this.speed);
        }
        const bulletHit = this.getOverlappingBullet(this);
        if (bulletHit && !bulletHit.isAlien) {
            this.sfx.explosionAudioFonction();
            this.removeAlien(this);
            this.removeBullet(bulletHit)
        }
    }

    moveDown = () => {
        this.intervalAlien = setInterval(()=>{
            this.setY(this.y + this.DOWN_SPEED)
        },3000);
    }



    fireAlien = ({creatBullet}) => {
        this.sfx.alienFireAudioFonction();
        creatBullet ({
                x: this.x + 50,
                y: this.y + 66,
                nomDeClassCSS: 'bullet-Alien',
                isAlien: true
            })
    }

    remove = () => {
        clearInterval(this.intervalAlien);
        this.el.remove(); //supprimer du DOM
        this.el = null; //liberer de la mémoire
    }









}