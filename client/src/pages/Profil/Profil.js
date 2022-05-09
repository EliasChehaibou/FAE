import React from 'react';
import Navbar from '../../Navbar/Navbar';
import { ReactSession } from 'react-client-session';

const Profil = () => {
    const ID = ReactSession.get("IDUtilisateur");
    console.log(ID);
    return (
        <div>
            <Navbar/>
            {(ID!=null) ? <div>ID USER:{ID}</div> : <p>USER NOT FOUND</p>}            
        </div>
    );
};

export default Profil;