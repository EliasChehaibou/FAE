import React from 'react';
import Navbar from '../../Navbar/Navbar';
import { ReactSession } from 'react-client-session';

const Historique = () => {
    const IDUtilisateur = ReactSession.get("IDUtilisateur");

    return (
        <div>
            <Navbar/>
            {IDUtilisateur ? <>
            <div>Voici l'historique de l'utilisateur n: {IDUtilisateur}</div></>:<>Historique non trouvé veuillez vous <a href='/connexion'>connecter</a> ou vous <a href='/inscription'>inscrire</a>.</>}
        </div>
    );
};

export default Historique;