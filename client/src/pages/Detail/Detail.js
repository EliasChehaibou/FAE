import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import { enchereUser, searchDetail } from '../../rest/search';
import { ReactSession } from 'react-client-session';

const Detail = () => {
    var urlcourante = document.location.href; 
    var url = new URL(urlcourante);
    var search_params = new URLSearchParams(url.search); 
    var IDAnnonce = search_params.get('ida');

    const IDUtilisateur = ReactSession.get("IDUtilisateur");

    const [annonce, setAnnonce] = useState([]);
    const [enchere, setEnchere] = useState();

    useEffect (()=>{
        searchDetail(IDAnnonce).then((response)=>{
            setAnnonce(response.data[0]);
            setEnchere(response.data[0].EnchereDepart);
        })   
    },[]);

    function handleEnchere(){
        let ench = parseInt(document.getElementById('ench').value)
        if (ench && ench>enchere) {
            enchereUser(ench, IDAnnonce);  
            setEnchere(ench);
        } else {
            console.log('enchere invalide')
        }
        
    }

    return (
        <div>
            <Navbar/>
            <div>Titre de l'annonce : {annonce.Titre}</div>
            <div>Description : {annonce.Description}</div>
            <div>Enchère de départ : {annonce.EnchereDepart}</div>
            <div>Enchère actuelle : {enchere}</div>
            {IDUtilisateur ? <><div>
            <input type='text' id='ench' placeholder='Tapez le montant de votre enchère'/>
            <button onClick={handleEnchere}>Enchérir</button></div>
            {(annonce.IsAchIm==1) ? <button>Acheter maintenant pour {annonce.AchatImmediat}€</button> : ''} </>: ''}
        </div>
    );
};

export default Detail;