import React from 'react';
import Navbar from '../../Navbar/Navbar';

const Connexion = () => {

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    function validatePassword(password) {
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i;
        return re.test(password);
    }

    function Verification() {
        // Récupérer la valeur des champs password et email
        var Email = document.getElementById('email').value;
        // Contrôle sur l'email
        if(Email=='' || !validateEmail(Email)) {
            document.getElementById('email').style.backgroundColor="red";
            document.getElementById('email').style.color="#FFF";
            return false;
        }
        
        var Password = document.getElementById('password').value;
        // Contrôle sur le mot de passe
        if(Password=='' || !validatePassword(Password)) {
            document.getElementById('password').style.backgroundColor="red";
            document.getElementById('password').style.color="#FFF";
            return false;
        }
    }
    return (
        <div>
            <Navbar/>
            <form name='form' action='http://localhost:2000/connexion' method='post' onSubmit={Verification} className='Form'>          
                <label htmlFor="email">E-mail</label>
                <input type="text" id="email" name="Email" required/>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="Password" required/>
                <input type='submit' value='Connexion'/>
            </form>
        </div>
    );
};

export default Connexion;