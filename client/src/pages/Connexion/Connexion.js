import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { connectUser } from "../../rest/search";
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("sessionStorage");
const Connexion = () => {

  const IDUtilisateur = ReactSession.get("IDUtilisateur");
  
  let navigate = useNavigate();
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function Verification(event) {
    event.preventDefault();
    
    // Récupérer la valeur du champ email
    var Email = document.getElementById("email").value;

    // Contrôle sur l'email
    if (Email == "" || !validateEmail(Email)) {
      document.getElementById("email").style.backgroundColor = "red";
      document.getElementById("email").style.color = "#FFF";
      return false;
    }

    var myForm = document.getElementById("form");
    let formData = new FormData(myForm);
    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    connectUser(object).then((response) => {
        if (response.data.length>0){
            ReactSession.set("IDUtilisateur", response.data[0].IDUtilisateur);
            if (response.data[0].IDAdmin!=null) {
              ReactSession.set("IDAdmin", response.data[0].IDAdmin);
            }
            navigate('/profil');}
    })
  }
  
  return (
    <div>
      <Navbar />
      {!IDUtilisateur ?
      <form
        id="form"
        name="form"
        method="post"
        onSubmit={Verification}
        className="Form"
        action="http://localhost:2000/connexion">
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email" name="Email" required />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="Password" required />
        <input type="submit" value="Connexion" />
      </form>
      :<>Vous êtes déjà connecté</>}
    </div>
  );
};

export default Connexion;
