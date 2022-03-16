import Music from '../Assets/SFX/DynamicFight_2.mp3'
import FireAudio from '../Assets/SFX/laser.mp3'
import shipExplosion from '../Assets/SFX/destroyer_1.mp3'
import Explosion from '../Assets/SFX/destroyer_2.mp3'
import alienFire from '../Assets/SFX/psz_dead.mp3'

export class SFX {
    constructor() {
        this.music = new Audio(Music);
        this.fireAudio = [];
        this.explosion = [];
        this.alienFire = [];
        this.shipExplosion = [];
    }



    fireAudioFonction = () => {
        this.fireAudio.push(new Audio(FireAudio))
        this.fireAudio.forEach( sfx => {
            sfx.play()
            setTimeout(()=> {
                this.fireAudio.splice(this.fireAudio.indexOf(sfx),1);
            },1000)
        })
    }
    explosionAudioFonction = () => {
        this.explosion.push(new Audio(Explosion))
        this.explosion.forEach( sfx => {
            sfx.play()
            setTimeout(()=> {
                this.explosion.splice(this.explosion.indexOf(sfx),1);
            },1000)
        })
    }
    alienFireAudioFonction = () => {
        this.alienFire.push(new Audio(alienFire))
        this.alienFire.forEach( sfx => {
            sfx.play()
            setTimeout(()=> {
                this.alienFire.splice(this.alienFire.indexOf(sfx),1);
            },1000)
        })
    }

    shipExplosionFonction = () => {
        this.shipExplosion.push(new Audio(shipExplosion))
        this.shipExplosion.forEach( sfx => {
            sfx.play()
            setTimeout(()=> {
                this.shipExplosion.splice(this.shipExplosion.indexOf(sfx),1);
            },1000)
        })
    }


}