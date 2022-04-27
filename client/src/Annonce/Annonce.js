import React from 'react';


const Annonce = (props) => {

    return (
        <div>
            <div>ID de l'annonce: {props.data.IDAnnonce}</div>
            <div>ID de l'utilisateur: {props.data.IDUtilisateur}</div>
            <div >Date de creation: {props.data.DateCrea}</div>
        </div>
    );
};

export default Annonce;