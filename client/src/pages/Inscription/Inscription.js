import React, {useState} from 'react';
import Navbar from '../../Navbar/Navbar';
import "./Inscription.css"
import { createUser } from '../../rest/search';

const Inscription = () => {
    const [isOk, setIsOk] = useState(false);

    function validateEmail(email) {
        var re =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validatePassword(password) {
        var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return re.test(password);
    }
    
    function Verification() {
        // Récupérer la valeur des champs password, email et confirm
        var Email = document.getElementById('email').value;
        var Password = document.getElementById('password').value;
        var Confirm = document.getElementById('confirm').value;
        // Contrôle sur l'email
        if(Email==='' || !validateEmail(Email)) {             
            document.getElementById('email').style.backgroundColor="red";
            document.getElementById('email').style.color="#FFF";
            return false;
        }

        // Contrôle sur le mot de passe
        if(Password==='' || !validatePassword(Password)) {
            document.getElementById('password').style.backgroundColor="red";
            document.getElementById('password').style.color="#FFF";
            return false;
        }

        // Confirmation du mot de passe
        if(Password!==Confirm) {     
            document.getElementById('confirm').style.backgroundColor="red";
            document.getElementById('confirm').style.color="#FFF";
            return false;
        }    
        var myForm = document.getElementById('form');
        let formData = new FormData(myForm);
        var object = {};
        formData.forEach((value, key) => (object[key] = value));
        createUser(object);
        setIsOk(true);
    }

    return (
        <div className='Inscription'>  
            <Navbar/>
            <p>Formulaire d'inscription</p>
            {!isOk &&
            <form id='form' name='form' action='http://localhost:2000/inscription' method='post' onSubmit={Verification} className='Form'>          
                <label htmlFor="nom">Nom*</label>
                <input type="text" id="nom" name="Nom" required/>
                <label htmlFor="prenom">Prénom</label>
                <input type="text" id="prenom" name="Prenom"/>
                <label htmlFor="sexe">Sexe</label>
                <select id="sexe" name="Sexe">
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                </select>
                <label htmlFor="ddn">Date de naissance</label>
                <input type="date" id="ddn" min="1908-08-08" max="2022-01-01" name="Birthdate"/>
                <label htmlFor="email">E-mail*</label>
                <input type="text" id="email" name="Email" required/>
                <label htmlFor="phone">Numéro de téléphone</label>
                <input type="text" id="phone" name="Phone"/>
                <label htmlFor="password">Mot de passe*</label>
                <input type="password" id="password" name="Password" required/>
                <label htmlFor="password">Doit contenir au moins 8 caractères dont au moins 1 lettre, 1 chiffre et 1 caractère spécial</label>
                <label htmlFor="confirm">Veuillez confirmer votre mot de passe*</label>
                <input type="password" id="confirm" name="Confirm" required/>
                <input type='submit' value='Enregistrer'/>
                <p>*Champs obligatoires</p>
            </form>}
            {isOk &&
            <div>Votre inscription est terminée, <a href='/connexion'>cliquez ici</a> pour vous connecter</div>}
        </div>
        
    );
};

export default Inscription;