import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import { connectUser } from '../../rest/search';

const Connexion = () => {
    const [IDUtilisateur, setIDUtilisateur] = useState([]);


    let navigate = useNavigate();
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function Verification() {
        // Récupérer la valeur du champ email
        var Email = document.getElementById('email').value;

        // Contrôle sur l'email
        if(Email=='' || !validateEmail(Email)) {
            document.getElementById('email').style.backgroundColor="red";
            document.getElementById('email').style.color="#FFF";
            return false;
        }        
        
        var myForm = document.getElementById('form');
        let formData = new FormData(myForm);
        var object = {};
        formData.forEach((value, key) => (object[key] = value));
        connectUser(object).then((response) => {
            console.log(IDUtilisateur);
            setIDUtilisateur(response.data);
            console.log(response.data);
        });
        console.log(IDUtilisateur);
        if (IDUtilisateur) {
            //navigate('/profil');
        }
        //window.location.reload();
        
    }
    return (
        <div>
            <Navbar/>
            <form id='form' name='form' action='http://localhost:2000/connexion' method='post' onSubmit={Verification} className='Form'>          
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