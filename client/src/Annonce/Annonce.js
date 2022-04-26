import React, { useEffect, useState } from 'react';
import { searchAnnonce } from '../rest/annonces';

const Annonce = () => {
  
    const [annonce, setAnnonce] = useState([]);

    useEffect (()=>{
        setAnnonce(annonce);
    }, []);

    function search (){ searchAnnonce().then((response) => setAnnonce(response.data))};

    return (
        <div>
            <button onClick={search}>Annonce</button>
            {annonce.map(e=><div key="{e.IDAnnonce}" >{e.IDAnnonce}</div>)}
        </div>
    );
};

export default Annonce;