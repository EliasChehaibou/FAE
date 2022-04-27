import React from 'react';
import Navbar from '../../Navbar/Navbar';
import "./Inscription.css"

const Inscription = () => {
    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
        
    function Verification() {
        // Récupérer la valeur des champs nom et email
        var Nom = document.getElementById('nom').value;
        var Email = document.getElementById('email').value;

        // Contrôle sur l'email
        if(Email=='' || !validateEmail(Email)) {
            document.getElementById('email').style.backgroundColor="red";
            document.getElementById('email').style.color="#FFF";
        }
    }

    return (
        <div className='Inscription'>  
            <Navbar/>
            <p>Formulaire d'inscription</p>
            <form name='form' action='http://localhost:2000/inscription' method='post' onSubmit={Verification} className='Form'>          
                <label for="nom">Nom*</label>
                <input type="text" id="nom" required/>
                <label for="prenom">Prénom</label>
                <input type="text" id="prenom"/>
                <label for="sexe">Sexe</label>
                <select id="sexe">
                    <option value="H">Homme</option>
                    <option value="F">Femme</option>
                </select>
                <label for="ddn">Date de naissance</label>
                <input type="date" id="ddn" min="1908-08-08" max="2022-01-01"/>
                <label for="email">E-mail*</label>
                <input type="text" id="email" required/>
                <label for="phone">Numéro de téléphone</label>
                <input type="text" id="phone"/>
                <input type='submit' value='Enregistrer'/>
                <p>*Champs obligatoires</p>
            </form>
        </div>
        
    );
};

export default Inscription;