import React, {useState, useEffect} from 'react';
import Navbar from '../../Navbar/Navbar';
import { posterAnnonce, searchCategories } from '../../rest/search';

const Poster = () => {
    const [isOk, setIsOk] = useState(false);
    const [isAchim, setIsAchIm] = useState();
    const [categories, setCategories] = useState([]);
    const [date, setDate] = useState();

    useEffect (()=>{
        searchCategories().then((response) => {
            setCategories(response.data);
        });
    },[]);

    function handleAchIm(event){
        setIsAchIm(event.target.value);
    }

    function Verification() {
        var myForm = document.getElementById('form');
        let formData = new FormData(myForm);
        var object = {};
        formData.forEach((value, key) => (object[key] = value));
        posterAnnonce(object);
        console.log(formData);
        setIsOk(true);
    }

    return (
        <div>
            <Navbar/>
            {!isOk && 
            <form id='form' name='form' action='http://localhost:2000/poster' method='post' onSubmit={Verification} className='Form' >
                <label htmlFor="titre">Titre*</label>
                <input type="text" id="titre" name="Titre" required/>
                <label htmlFor="Description">Description</label>
                <input type="text" id="description" name="Description"/>
                <label htmlFor="enchdep">Prix de départ*</label>
                <input type="number" id="enchdep" name="EnchereDepart" required/>
                <div onChange={handleAchIm}>Voulez-vous inclure une option d'achat immédiat ?
                    <input type="radio" value="1" name="isAchIm" /> Oui
                    <input type="radio" value="0" name="isAchIm" defaultChecked/> Non
                </div>
                {isAchim == "1" && <>
                    <label htmlFor="achim">Veuillez saisir le montant de l'option d'achat*</label>
                    <input type="number" id="achim" name="AchatImmediat" required/>
                </>}
                Dans quelle catégorie se trouve votre annonce ?
                <select id="categorie" name="IDCategorie">
                    {categories.map((e, i)=><option key={i} value={e.IDCategorie}>{e.Nom}</option>)}
                </select>
                <label htmlFor="ddf">Date de fin de la vente</label>
                <input type="date" id="ddf" min="2022-01-01" max="2028-01-01" name="Datefin"/>
                <input type='submit' value='Enregistrer'/>
                <p>*Champs obligatoires</p>
                </form>}
            {isOk && 
            <>Félicitations! Votre annonce a été postée et la vente se terminera le </>}
        </div>
    );
};

export default Poster;