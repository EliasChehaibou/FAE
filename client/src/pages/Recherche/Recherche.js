import React, { useEffect, useState } from 'react';
import Annonce from '../../Annonce/Annonce';
import Navbar from '../../Navbar/Navbar';
import { searchAnnonce, searchCategories } from '../../rest/search';

const Recherche = () => {
    const [annonce, setAnnonce] = useState([]);
    const [num_page, setNumPage] = useState(1);
    const [total_page, setTotalPage] = useState(0);
    const [categories, setCategories] = useState([]);
    
    function search(){
        searchAnnonce()
            .then((response) => {
                setAnnonce(response.data);
                setTotalPage(response.data.length);
            })
            .catch(() => {
            // en cas d'erreur  
            })
        searchCategories()
            .then((response) => {
                setCategories(response.data);
            })
            .catch(() => {
            // en cas d'erreur  
            })
    }
       
    useEffect (()=>{
        search();
    },[]);
    
    function handlePagePlus1(){
        setNumPage(num_page+1);
    }

    function handlePagePlus2(){
        setNumPage(num_page+2);
    }
    
    function handlePagePrec(){
        setNumPage(num_page-1);
    }

    return (
        <div>
            <Navbar/>
            <div className='rech'>
                <input className='input' placeholder='Rechercher ici ce que vous voulez...'/>
                <button className='btn_rech'>Rechercher</button>
            </div>
            {annonce.slice((num_page*1)-1,num_page*1).map((e, i)=><div key={i}><Annonce data={e}/></div>)}
            {categories.map((e, i)=><div key={i}><a href={'./recherche?cat='+e.IDCategorie}>{e.Nom}</a></div>)}
            <ul>
                {num_page>1 ?
                    <li><button onClick={handlePagePrec}>Page précédente</button></li>: ''
                }
                <li><button>{num_page}</button></li>
                {(num_page+1)<=total_page ?
                    <li><button onClick={handlePagePlus1}>{num_page+1}</button></li>: ''
                }
                {num_page+2<=total_page ?
                    <li><button onClick={handlePagePlus2}>{num_page+2}</button></li>: ''
                }
            </ul>
        </div>
    );
};

export default Recherche;