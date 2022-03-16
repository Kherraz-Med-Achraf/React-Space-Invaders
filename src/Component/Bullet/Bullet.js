import bulletImg from '../../Assets/Weapons/weapon.png'
import alienBullet from '../../Assets/Weapons/weaponAlien.png'


export class Bullet   {
    constructor({x,y, nomDeClassCSS, isAlien}) {
        this.el = document.createElement('img')
        this.el.src = isAlien ? alienBullet : bulletImg;
        this.isAlien = isAlien;
        this.el.className = nomDeClassCSS
        this.setX(x);
        this.setY(y);
        this.speed = 5;
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

    move = () => {
        if (this.isAlien) {
            this.setY(this.y + this.speed);
        }else {
            this.setY(this.y - this.speed);
        }


    }

    remove = () => {
        this.el.remove(); //supprimer du DOM
        this.el = null; //liberer de la mémoire
    }

}