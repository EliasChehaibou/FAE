import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import { posterAnnonce, searchCategories } from "../../rest/search";
import { ReactSession } from "react-client-session";
import axios from "axios";
const Poster = () => {
  const IDUtilisateur = ReactSession.get("IDUtilisateur");

  const [isPoste, setIsPoste] = useState(false);
  const [isAchim, setIsAchIm] = useState();
  const [categories, setCategories] = useState([]);
  const [dateFin, setDateFin] = useState([]);
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    searchCategories().then((response) => {
      setCategories(response.data);
    });
  }, []);

  function handleAchIm(event) {
    setIsAchIm(event.target.value);
  }
  function onFileChange(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setSelectedFile(reader.result);
    };
  }
  function Verification(e) {
    e.preventDefault();
    var myForm = document.getElementById("form");
    let formData = new FormData(myForm);

    var object = {};

    formData.forEach((value, key) => (object[key] = value));
    console.log(object);

    posterAnnonce({
      IDUtilisateur: IDUtilisateur,
      Annonce: object,
      Image: selectedFile,
    });

    setDateFin(document.getElementById("ddf").value);
    setIsPoste(true);
    return false;
  }

  return (
    <div>
      <Navbar />
      {IDUtilisateur != null ? (
        <>
          {!isPoste && (
            <form
              id="form"
              name="form"
              onSubmit={Verification}
              className="Form"
            >
              <label htmlFor="titre">Titre*</label>
              <input type="text" id="titre" name="Titre" required />
              <label htmlFor="Description">Description</label>
              <input type="text" id="description" name="Description" />
              <label htmlFor="enchdep">Prix de départ*</label>
              <input type="number" id="enchdep" name="EnchereDepart" required />
              <div onChange={handleAchIm}>
                Voulez-vous inclure une option d'achat immédiat ?
                <input type="radio" value="1" name="isAchIm" /> Oui
                <input
                  type="radio"
                  value="0"
                  name="isAchIm"
                  defaultChecked
                />{" "}
                Non
              </div>
              {isAchim == "1" && (
                <>
                  <label htmlFor="achim">
                    Veuillez saisir le montant de l'option d'achat*
                  </label>
                  <input
                    type="number"
                    id="achim"
                    name="AchatImmediat"
                    required
                  />
                </>
              )}
              Dans quelle catégorie se trouve votre annonce ?
              <select id="categorie" name="IDCategorie">
                {categories.map((e, i) => (
                  <option key={i} value={e.IDCategorie}>
                    {e.Nom}
                  </option>
                ))}
              </select>
              <label htmlFor="ddf">Date de fin de la vente*</label>
              <input
                type="date"
                id="ddf"
                min="2022-01-01"
                max="2028-01-01"
                name="Datefin"
                required
              />
              <label>Ajouter une photo</label>
              <input type="file" onChange={onFileChange} />
              <input type="submit" value="Enregistrer" />
              <p>*Champs obligatoires</p>
            </form>
          )}
          {isPoste && (
            <>
              Félicitations! Votre annonce a été postée et la vente se terminera
              le {dateFin}
            </>
          )}
        </>
      ) : (
        <>
          Pour poster une annonce veuillez vous{" "}
          <a href="/connexion">connecter</a> ou vous{" "}
          <a href="/inscription">inscrire</a>.
        </>
      )}
    </div>
  );
};

export default Poster;
