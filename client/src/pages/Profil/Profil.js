import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import { ReactSession } from 'react-client-session';
import { searchUtilisateur } from '../../rest/search';



const Profil = () => {
    const IDUtilisateur = ReactSession.get("IDUtilisateur");
    const [utilisateur, setUtilisateur] = useState([]);

    useEffect (()=>{
        searchUtilisateur(IDUtilisateur).then((response)=>{
            setUtilisateur(response.data[0]);
        })   
    },[]);

    return (
        <div>
            <Navbar/>
            {(IDUtilisateur!=null) ? 
            <><div>Nom : {utilisateur.Nom}</div> 
            <div>Prenom : {utilisateur.Prenom}</div> 
            <div>Email : {utilisateur.Email}</div> 
            <div>Sexe : {utilisateur.Sexe}</div> 
            <div>Date de naissance : {utilisateur.Birthdate}</div> 
            <div>Numéro de téléphone : {utilisateur.Phone}</div>
            <div>Consulter mon <a href='/historique'>historique</a></div></>
            : <>Profil non trouvé veuillez vous <a href='/connexion'>connecter</a> ou vous <a href='/inscription'>inscrire</a>.</>}            
        </div>
    );
};

export default Profil;