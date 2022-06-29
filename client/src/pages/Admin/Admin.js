import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import { ReactSession } from 'react-client-session';
import { createCategorie, deleteCategorie, deleteUtilisateur, searchCategories, searchUtilisateurs } from '../../rest/search';

const Admin = () => {
    const IDAdmin = ReactSession.get("IDAdmin");
    const IDUtilisateur = ReactSession.get("IDUtilisateur");
    const [categories, setCategories] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [num_page, setNumPage] = useState(1);
    const [total_page, setTotalPage] = useState(0);

    function search(){
        searchCategories()
            .then((response) => {
                setCategories(response.data);
            })
            .catch(() => {
            // en cas d'erreur  
            });
        if (IDUtilisateur) {
            searchUtilisateurs(IDUtilisateur)
            .then((response) => {
                setUtilisateurs(response.data);
                setTotalPage(response.data.length/10);
            })
            .catch(() => {
            // en cas d'erreur  
            })
        }
        
    }

    useEffect (()=>{
        search();
    },[]);

    function handlePageSuiv(){
        setNumPage(num_page+1);
    }
    
    function handlePagePrec(){
        setNumPage(num_page-1);
    }

    function handleDeleteCate(Nom, IDCategorie){
        if (document.getElementById(Nom)){
            document.getElementById(Nom).remove();
        }
        if (document.getElementById(IDCategorie)){
            document.getElementById(IDCategorie).remove();
        }
        deleteCategorie(Nom, IDCategorie);
    }

    function handleDeleteUser(Nom, IDUtilisateur){
        if (document.getElementById(Nom)){
            document.getElementById(Nom).remove();
        }
        if (document.getElementById(IDUtilisateur)){
            document.getElementById(IDUtilisateur).remove();
        }
        deleteUtilisateur(IDUtilisateur);
    }

    function AjoutCate(){
        var myForm = document.getElementById('form');
        let formData = new FormData(myForm);
        var object = {};
        formData.forEach((value, key) => (object[key] = value));
        createCategorie(object).then();
        alert('catégorie ajoutée');
    }

    return (
        <div>
            <Navbar/>
            {IDUtilisateur ?
            <>{IDAdmin ?
            <><h3 style={{marginTop:'0.5%', marginLeft:'0.5%'}}>Liste des catégories</h3><ul className="list-group">{categories.map((e, i)=><div id={e.Nom} key={i}><li className="list-group-item">{e.Nom} <button className="btn btn-outline-danger" id={e.IDCategorie} onClick={()=>handleDeleteCate(e.Nom, e.IDCategorie)}>Supprimer</button></li></div>)}</ul>
            <form id='form' name='form' onSubmit={AjoutCate} className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="nom" className="sr-only">Nom de la catégorie : </label>
                    <input type="text" id="nom" name="Nom" className="form-control" required/>     
                </div>
                <input type='submit' className="btn btn-primary mb-2" value='Ajouter une nouvelle catégorie' style={{marginLeft:'1rem'}}/>
            </form>
            <h3 style={{marginTop:'2%', marginLeft:'0.5%'}}>Liste des utilisateurs</h3>
            <ul className="list-group">{utilisateurs.slice((num_page*10)-10,(num_page*10)-1).map((e, i)=><div id={e.Nom} key={i}><li className="list-group-item">{e.Nom+" "+e.Prenom} <button className="btn btn-outline-danger" id={e.IDUtilisateur} onClick={()=>handleDeleteUser(e.Nom, e.IDUtilisateur)}>Supprimer</button></li></div>)}</ul>
            <ul className="pagination">
                {num_page>1 ?
                    <li className="page-item"><button className="page-link" onClick={handlePagePrec}>Page précédente</button></li>: ''
                }
                <li className="page-item"><button className="page-link">{num_page}</button></li>
                {(num_page+1)<=total_page ?
                    <li className="page-item"><button className="page-link" onClick={handlePageSuiv}>Page suivante</button></li>: ''
                }
            </ul>
            </>
            :<>Vous n'êtes pas connecté en tant qu'administrateur</>}</>
            :<>Profil non trouvé veuillez vous <a href='/connexion'>connecter</a> ou vous <a href='/inscription'>inscrire</a>.</>}  
        </div>
    );
};

export default Admin;