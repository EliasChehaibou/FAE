import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import { ReactSession } from 'react-client-session';
import { historique } from '../../rest/search';
import Annonce from '../../Annonce/Annonce';



const Historique = () => {
    const IDUtilisateur = ReactSession.get("IDUtilisateur");
    const [vendues, setVendues] = useState([]);
    const [achetees, setAchetees] = useState([]);
    const [vente, setVente] = useState([]);
    const [enchere, setEnchere] = useState([]);

    useEffect (()=>{
            historique(IDUtilisateur).then((response) => {
                setVendues(JSON.parse(response.data.vendues));
                setAchetees(JSON.parse(response.data.achetees));
                setVente(JSON.parse(response.data.vente));
                setEnchere(JSON.parse(response.data.enchere));
            });             
    },[]);

    return (
        <div>
            <Navbar/>
            {IDUtilisateur ? <>
            <h2>Mon historique</h2>
            <div><h3>Annonces achetées</h3>
                {achetees.map((e, i)=><div key={i}><Annonce data={e}/></div>)}
            </div>
            <div><h3>Annonces vendues</h3>
                {vendues.map((e, i)=><div key={i}><Annonce data={e}/></div>)}
            </div>
            <div><h3>Annonces en vente</h3>
                {vente.map((e, i)=><div key={i}><Annonce data={e}/></div>)}
            </div>
            <div><h3>Enchères en cours</h3>
                {enchere.map((e, i)=><div key={i}><Annonce data={e}/></div>)}
            </div>
            </>:<>Historique non trouvé veuillez vous <a href='/connexion'>connecter</a> ou vous <a href='/inscription'>inscrire</a>.</>}
        </div>
    );
};

export default Historique;