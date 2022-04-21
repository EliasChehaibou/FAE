import React from 'react';
import Navbar from '../../Navbar/Navbar';
import "./Inscription.css"

const Inscription = () => {
    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
        
    function Verification() {
        // Récupérer lavaleur des champs nom et email
        var Nom = document.getElementById('nom').value;
        var Email = document.getElementById('email').value;
        
        // Contrôle sur le nom
        if(Nom==''){
            alert('Vous devez compléter votre nom !');
            document.getElementById('nom').style.backgroundColor="red";
            document.getElementById('nom').style.color="#FFF";
            
            // Permet de bloquer l'envoi du formulaire
            return false;
        }
        else{
            document.getElementById('nom').style.backgroundColor="#9C6";
        }
        
        // Contrôle sur l'email
        if(Email=='' || !validateEmail(Email)) {
            alert('Vous devez compléter votre adresse email');
            document.getElementById('email').style.backgroundColor="red";
            document.getElementById('email').style.color="#FFF";
            return false;
        }
        
        else{
            document.getElementById('email').style.backgroundColor="#9C6";
        }
    }

    return (
        <div className='Inscription'>  
            <Navbar/>
            <p>Formulaire d'inscription</p>
            <form name='form' action='' method='post' onSubmit={Verification} className='Form'>          
                <label for="nom">Nom</label>
                <input type="text" id="nom"/>
                <label for="prenom">Prénom</label>
                <input type="text" id="prenom"/>
                <label for="sexe">Sexe</label>
                <select id="sexe">
                    <option value="H">Homme</option>
                    <option value="F">Femme</option>
                </select>
                <label for="ddn">Date de naissance</label>
                <input type="date" id="ddn" min="1908-08-08" max="2022-01-01"/>
                <label for="email">E-mail</label>
                <input type="text" id="email"/>
                <label for="phone">Numéro de téléphone</label>
                <input type="text" id="phone"/>
                <input type='submit' value='Enregistrer'/>
            </form>
        </div>
        
    );
};

export default Inscription;