import Music from '../Assets/SFX/DynamicFight_2.mp3'
import FireAudio from '../Assets/SFX/laser.mp3'
import shipExplosion from '../Assets/SFX/destroyer_1.mp3'
import Explosion from '../Assets/SFX/destroyer_2.mp3'
import alienFire from '../Assets/SFX/psz_dead.mp3'

export class SFX {
    constructor() {  //initialisation des variables
        this.music = new Audio(Music);
        this.fireAudio = [];
        this.explosion = [];
        this.alienFire = [];
        this.shipExplosion = [];
        this.mute = true;
    }

    changeFonction = () => {
        this.mute = !this.mute
    }



    fireAudioFonction = () => {  //when ship shoot
        if (this.mute === true)  {

        }else {
            this.fireAudio.push(new Audio(FireAudio))
            this.fireAudio.forEach( sfx => {  //permet de parcourir le tableu
                sfx.play()
                sfx.volume = 0.5
                setTimeout(()=> {
                    this.fireAudio.splice(this.fireAudio.indexOf(sfx),1);//remove after 1s
                },1000)
            })
        }

    }
    explosionAudioFonction = () => { //when Alien explose
        if (this.mute === true) {

        }else {
            this.explosion.push(new Audio(Explosion))
            this.explosion.forEach(sfx => {
                sfx.play()
                setTimeout(() => {
                    this.explosion.splice(this.explosion.indexOf(sfx), 1);
                }, 1000)
            })
        }
    }
    alienFireAudioFonction = () => { //when alien fire
        if (this.mute === true) {

        }else {
            this.alienFire.push(new Audio(alienFire))
            this.alienFire.forEach(sfx => {
                sfx.play()
                sfx.volume = 0.3
                setTimeout(() => {
                    this.alienFire.splice(this.alienFire.indexOf(sfx), 1);
                }, 1000)
            })
        }
    }

    shipExplosionFonction = () => { //when ship explode
        if (this.mute === true) {

        }else {
            this.shipExplosion.push(new Audio(shipExplosion))
            this.shipExplosion.forEach(sfx => {
                sfx.play()
                setTimeout(() => {
                    this.shipExplosion.splice(this.shipExplosion.indexOf(sfx), 1);
                }, 1000)
            })
        }
    }
}