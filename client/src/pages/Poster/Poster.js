import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import { posterAnnonce, searchCategories } from "../../rest/search";
import { ReactSession } from "react-client-session";

const Poster = () => {
  const IDUtilisateur = ReactSession.get("IDUtilisateur");

  const [isPoste, setIsPoste] = useState(false);
  const [isAchim, setIsAchIm] = useState();
  const [categories, setCategories] = useState([]);
  const [dateFin, setDateFin] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [error, setError] = useState(false);

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
    if (isAchim =="1") {
      var enchere = document.getElementById('enchdep').value;
      var option = document.getElementById('achim').value;
      if (enchere>=option) {
        setError(true);
        return false;
      }
    }
    



    var myForm = document.getElementById("form");
    let formData = new FormData(myForm);

    var object = {};

    formData.forEach((value, key) => (object[key] = value));

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
            <section  className="100%" style={{minHeight:"100vh", backgroundColor: "#eee"}}>
            <div  className="container h-100" style={{display: 'flex', justifyContent: 'center'}}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11" style={{minWidth: '150%'}}>
                        <div className="card text-black" style={{borderRadius: '25px', marginTop: '15px', marginBottom: '15px'}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center"  style={{minWidth: '80%'}}>
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Poster une annonce</p>
                                        <form id="form" name="form" onSubmit={Verification} className="Form">
                                          <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" htmlFor="titre" >Titre*</label>
                                                <input type="text" id="titre" name="Titre" className="form-control" required/>       
                                            </div>
                                          </div>
                                          <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" htmlFor="description" >Description</label>
                                                <textarea type="text" rows="4" id="description" name="Description" className="form-control"/>       
                                            </div>
                                          </div>
                                          <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" htmlFor="enchdep" >Prix de d??part*</label>
                                                <input type="number" min="1" id="enchdep" name="EnchereDepart" className="form-control" required/>       
                                            </div>
                                          </div>
                                          <div className="col-md-6 mb-4" onChange={handleAchIm}>
                                            <h6 className="mb-2 pb-1">Voulez-vous inclure une option d'achat imm??diat ?</h6>
                                            <div className="form-check form-check-inline">
                                              <input className="form-check-input" type="radio" name="isAchIm" id="oui" value="1"/>
                                              <label className="form-check-label" htmlFor="oui">Oui</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                              <input className="form-check-input" type="radio" name="isAchIm" id="non" value="0" defaultChecked/>
                                              <label className="form-check-label" htmlFor="non">Non</label>
                                            </div>
                                          </div>
                                          {isAchim == "1" && (
                                            <div className="d-flex flex-row align-items-center mb-4">
                                              <div className="form-outline flex-fill mb-0">
                                                  <label className="form-label" htmlFor="achim" >Veuillez saisir le montant de l'option d'achat en euros*</label>
                                                  <input type="number" min="1" id="achim" name="AchatImmediat" className="form-control" required/>       
                                              </div>
                                            </div>
                                          )}
                                          <div className="col-md-6 mb-4">
                                            <label className="form-label" htmlFor="categorie">Dans quelle cat??gorie se trouve votre annonce ?</label>
                                            <select className="select" id="categorie" name="IDCategorie">
                                              {categories.map((e, i) => (
                                                <option key={i} value={e.IDCategorie}>{e.Nom}</option>
                                              ))}
                                            </select>
                                          </div>
                                          <div className="input-group date" data-provide="datepicker" style={{display:"grid"}}>
                                              <label className="form-label" htmlFor="ddf">Date de fin de la vente*</label>
                                              <input className="form-control" type="date" id="ddf" name="Datefin" min="2022-07-01" style={{minWidth:"100%",marginBottom:'5%'}}/>
                                          </div>
                                          <div className="d-flex flex-row align-items-center mb-4">
                                              <div className="form-outline flex-fill mb-0">
                                                  <label className="form-label" htmlFor="photo" >Ajouter une photo</label>
                                                  <input type="file" id="photo" onChange={onFileChange} className="form-control" style={{minWidth:"100%"}}/>       
                                              </div>
                                          </div>
                                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <input type='submit' className="btn btn-primary btn-lg" value="Poster l'annonce"/>
                                          </div>
                                          <p>*Champs obligatoires</p>
                                          {error && 
                                            <div class="alert alert-danger" role="alert">
                                            L'option d'achat doit ??tre strictement sup??rieure au prix de d??part.
                                            </div>}
                                        </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          )}
          {isPoste && (
            <>
              F??licitations! Votre annonce a ??t?? post??e et la vente se terminera
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
