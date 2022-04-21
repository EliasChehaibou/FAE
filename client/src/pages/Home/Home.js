import React from 'react';
import Navbar from '../../Navbar/Navbar';
import "./Home.css"

const Home = () => {
    return (
        <div className='Home'>
            <div className='logo'>
                <img src='/static/logo.png' alt="Foncez aux enchères" className='img'/>
            </div>
            
            <h1 className='titre'>Chez FAE on a tout ce qu'on veut !</h1>      
                 <Navbar/>
                <div className='rech'>
                <input className='input' placeholder='Rechercher ici ce que vous voulez...'/>
                <button className='btn_rech'>Rechercher</button>
                </div>
        </div>
    );
};

export default Home;