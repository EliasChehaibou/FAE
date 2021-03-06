import React, {useState} from 'react';
import Navbar from '../../Navbar/Navbar';
import "./Inscription.css"
import { createUser } from '../../rest/search';
import { ReactSession } from 'react-client-session';

const Inscription = () => {

    const IDUtilisateur = ReactSession.get("IDUtilisateur");

    const [isOk, setIsOk] = useState(false);
    const [error, setError] = useState(false);

    function validateEmail(email) {
        var re =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validatePassword(password) {
        var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return re.test(password);
    }
    
    function Verification(event) {
        event.preventDefault();
       
        var Email = document.getElementById('email').value;
        var Password = document.getElementById('password').value;
        var Confirm = document.getElementById('confirm').value;

        document.getElementById('email').style.backgroundColor="#FFF";
        document.getElementById('email').style.color="#212529";
        document.getElementById('password').style.backgroundColor="#FFF";
        document.getElementById('password').style.color="#212529";
        document.getElementById('confirm').style.backgroundColor="#FFF";
        document.getElementById('confirm').style.color="#212529";
        
        var ok = true;

        if (Email==='' || !validateEmail(Email)) {             
            document.getElementById('email').style.backgroundColor="red";
            document.getElementById('email').style.color="#FFF";
            ok = false;
        } 
        if (Password==='' || !validatePassword(Password)) {
            document.getElementById('password').style.backgroundColor="red";
            document.getElementById('password').style.color="#FFF";
            ok = false;
        }
        if (Password!==Confirm) {     
            document.getElementById('confirm').style.backgroundColor="red";
            document.getElementById('confirm').style.color="#FFF";
            ok = false;
        } 
        if (ok) {
            var myForm = document.getElementById('form');
            let formData = new FormData(myForm);
            var object = {};
            formData.forEach((value, key) => (object[key] = value));
            createUser(object);
            setIsOk(true);
        } else {
            setError(true)
            return false;
        }
        
           
        
    }

    return (
        <div className='Inscription'>  
            <Navbar/>
            {!IDUtilisateur ?
            <>
            {!isOk &&
            <section className="100%" style={{backgroundColor: "#eee", minHeight:"100vh"}}>
                <div className="container h-100" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11" style={{minWidth: '150%'}}>
                            <div className="card text-black" style={{borderRadius: '25px', marginTop: '15px', marginBottom: '15px'}}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center" style={{minWidth: '80%'}}>
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{width:'100%', textAlign:'center'}}>Formulaire d'inscription</p>
                
                                            <form id='form' name='form' onSubmit={Verification} className='mx-1 mx-md-4'>          
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="nom" >Nom*</label>
                                                        <input type="text" id="nom" name="Nom" className="form-control" required/>       
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="prenom" >Pr??nom</label>
                                                        <input type="text" id="prenom" name="Prenom" className="form-control"/>       
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4" style={{display:"grid"}}>
                                                <label className="form-label" htmlFor="sexe">Sexe</label>
                                                    <select className="select" id="sexe" name="Sexe">
                                                        <option value="Homme">Homme</option>
                                                        <option value="Femme">Femme</option>
                                                    </select>
                                                </div>
                                                <div className="input-group date" data-provide="datepicker" style={{display:"grid"}}>
                                                    <label className="form-label" htmlFor="ddn">Date de naissance</label>
                                                    <input className="form-control" type="date" id="ddn" min="1908-08-08" max="2022-01-01" name="Birthdate" style={{minWidth:"100%",marginBottom:'5%'}}/>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="email">E-mail*</label>
                                                        <input type="text" id="email" name="Email" className="form-control" required/>       
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="phone" name="Prenom">Num??ro de t??l??phone</label>
                                                        <input type="text" id="phone" name="Phone" className="form-control"/>       
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="password" >Mot de passe*</label>
                                                        <input type="password" id="password" name="Password" className="form-control" required/>   
                                                        <label className="form-label" htmlFor="password">Doit contenir au moins 8 caract??res dont au moins 1 lettre, 1 chiffre et 1 caract??re sp??cial</label>    
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="confirm" >Veuillez confirmer votre mot de passe*</label>
                                                        <input type="password" id="confirm" name="Confirm" className="form-control" required/>   
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <input type='submit' className="btn btn-primary btn-lg" value="S'inscrire"/>
                                                </div>
                                                <p>*Champs obligatoires</p>
                                                {error && 
                                                    <div class="alert alert-danger" role="alert">
                                                    L'inscription a ??chou??. V??rifier les champs surlign??s en rouge.
                                                    </div>}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
            {isOk &&
            <div>Votre inscription est termin??e, <a href='/connexion'>cliquez ici</a> pour vous connecter</div>}</>
            :<>Vous ??tes d??j?? connect??</>}
        </div>
        
    );
};

export default Inscription;