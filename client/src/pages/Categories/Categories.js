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
            {categories.map((e, i)=><div key={i}><a href={'./recherche?cat='+e.IDCategorie}>{e.Nom}</a></div>)}
        </div>
    );
};

export default Categories;