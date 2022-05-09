import React from 'react';


const Annonce = (props) => {

    return (
        <div>
            <a href={'./detail?ida='+props.data.IDAnnonce}>Titre de l'annonce: {props.data.Titre}</a>
            <div>ID de l'annonce: {props.data.IDAnnonce}</div>
            <div>ID de l'utilisateur: {props.data.IDUtilisateur}</div>
            <div >Date de creation: {props.data.DateCrea}</div>
            
        </div>
    );
};

export default Annonce;