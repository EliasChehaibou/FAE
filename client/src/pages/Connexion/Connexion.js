import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { connectUser } from "../../rest/search";
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("sessionStorage");
const Connexion = () => {

  const [error, setError] = useState(false);
  const IDUtilisateur = ReactSession.get("IDUtilisateur");
  
  let navigate = useNavigate();

  function Verification(event) {
    event.preventDefault();

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
            navigate('/profil');
          } else {
            setError(true);
          }
    })
  }
  
  return (
    <div>
      <Navbar />
      {!IDUtilisateur ?
      <section className="vh-100" style={{backgroundColor: "#eee"}}>
        <div className="container h-100" style={{display: 'flex', justifyContent: 'center'}}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11" style={{minWidth: '150%'}}>
                    <div className="card text-black" style={{borderRadius: '25px', marginTop: '15px', marginBottom: '15px'}}>
                        <div className="card-body p-md-5" >
                            <div className="justify-content-center" style={{minWidth: '100%', display:'flex'}}>
                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{width:'100%', textAlign:'center'}}>Formulaire de connexion</p>

                                    <form id="form" name="form" method="post" onSubmit={Verification} className="mx-1 mx-md-4" action="http://localhost:2000/connexion">
                                      <div className="d-flex flex-row align-items-center mb-4">
                                          <div className="form-outline flex-fill mb-0">
                                            <label htmlFor="email" className="form-label">E-mail</label>
                                            <input type="text" id="email" name="Email"  className="form-control" required />      
                                          </div>
                                      </div>
                                      <div className="d-flex flex-row align-items-center mb-4">
                                        <div className="form-outline flex-fill mb-0">
                                          <label htmlFor="password" className="form-label">Mot de passe</label>
                                          <input type="password" id="password" name="Password" className="form-control" required />
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="submit" className="btn btn-primary btn-lg">Se connecter</button>
                                      </div>
                                      {error && 
                                        <div class="alert alert-danger" role="alert">
                                          L'authentification a échoué. Vérifier votre identifiant et votre mot de passe.
                                        </div>}
                                    </form>
                                </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      :<>Vous êtes déjà connecté</>}
    </div>
  );
};

export default Connexion;
