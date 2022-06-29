import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import "./Categories.css"
import { searchCategories } from '../../rest/search';

const Categories = () => {

    const [categories, setCategories] = useState([]);

    function search(){
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

    return (
        <div>
        <Navbar/>
        <div className="list-group">
            {categories.map((e, i)=><div id='Cate' key={i}><a className="list-group-item list-group-item-action" href={'./recherche?cat='+e.IDCategorie} id="Lien">{e.Nom}</a></div>)}
        </div>
        </div>
    );
};

export default Categories;