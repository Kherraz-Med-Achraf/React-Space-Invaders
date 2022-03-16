class Test {
    constructor(prenom, nom, email) {
        this.prenom = prenom;
        this.nom = nom;
        this.email = email;
    };


    sePresenter() {
        console.log("Je m'appelle " + this.prenom + ' ' + this.nom + " et vous pouvez me contacter à l'adresse email " + this.email + "."
    )
        ;
    }

}



export default Test;