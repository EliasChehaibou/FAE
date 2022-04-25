import React from 'react';
import Navbar from '../../Navbar/Navbar';
import "./Categories.css"

const Categories = () => {
    return (
        <div>
            <Navbar/>
            <div>
                <div><a href='./recherche?cat=jou'>Jouets</a></div>
                <div><a href='./recherche?cat=vet'>Vêtements</a></div>
                <div><a href='./recherche?cat=hig'>High-tech</a></div>
                <div><a href='./recherche?cat=ani'>Animaux</a></div>
                <div><a href='./recherche?cat=veh'>Véhicules</a></div>
                <div><a href='./recherche?cat=spo'>Sports</a></div>
            </div>
        </div>
    );
};

export default Categories;