import React from 'react';
import Navbar from '../../Navbar/Navbar';
import "./Home.css"

const Home = () => {
    return (
        <div className='Home'>
            <h1 className='titre'>Chez FAE on a tout ce qu'on veut !</h1>
            <div className='rech'>
                <p>Rechercher :</p>
                <input/>
            </div>
            
           <Navbar/>
        </div>
    );
};

export default Home;