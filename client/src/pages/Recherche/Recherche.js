import React, { useEffect, useState } from "react";
import Annonce from "../../Annonce/Annonce";
import Navbar from "../../Navbar/Navbar";
import {
  searchAnnonce,
  searchCategories,
  searchAnnonceCate,
  searchAnnonceRech,
  searchAnnonceRechCate,
} from "../../rest/search";
import { useNavigate } from "react-router-dom";
import "./Recherche.css"

const Recherche = () => {
  var urlcourante = document.location.href;
  var url = new URL(urlcourante);
  var search_params = new URLSearchParams(url.search);

  if (search_params.has("cat")) {
    var IDcat = search_params.get("cat");
  }
  if (search_params.has("rech")) {
    var rech = search_params.get("rech");
  }

  const [annonce, setAnnonce] = useState([]);
  const [num_page, setNumPage] = useState(1);
  const [total_page, setTotalPage] = useState(0);
  const [categories, setCategories] = useState([]);

  function search() {
    if (IDcat && rech) {
      searchAnnonceRechCate(rech, IDcat)
        .then((response) => {
          setAnnonce(response.data);
          setTotalPage(Math.round(response.data.length / 5));
        })
        .catch(() => {
          // en cas d'erreur
        });
    } else if (IDcat) {
      searchAnnonceCate(IDcat)
        .then((response) => {
          setAnnonce(response.data);
          setTotalPage(Math.round(response.data.length / 5));
        })
        .catch(() => {
          // en cas d'erreur
        });
    } else if (rech) {
      searchAnnonceRech(rech)
        .then((response) => {
          setAnnonce(response.data);
          setTotalPage(Math.round(response.data.length / 5));
        })
        .catch(() => {
          // en cas d'erreur
        });
    } else {
      searchAnnonce()
        .then((response) => {
          setAnnonce(response.data);
          setTotalPage(Math.round(response.data.length / 5));
        })
        .catch(() => {
          // en cas d'erreur
        });
        
    }
    
    searchCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => {
        // en cas d'erreur
      });
  }

  useEffect(() => {
    search();
  }, []);

  function handlePageSuiv() {
    setNumPage(num_page + 1);
  }

  function handlePagePrec() {
    setNumPage(num_page - 1);
  }

  const navigate = useNavigate();

  function handleSearch() {
    var boutons = document.getElementsByName("categorie");
    var valeur;
    for (var i = 0; i < boutons.length; i++) {
      if (boutons[i].checked) {
        valeur = boutons[i].value;
      }
    }

    if (document.getElementById("rech").value && valeur) {
      navigate(
        "/recherche?rech=" +
          document.getElementById("rech").value +
          "&cat=" +
          valeur
      );
    } else if (document.getElementById("rech").value) {
      navigate("/recherche?rech=" + document.getElementById("rech").value);
    } else if (valeur) {
      navigate("/recherche?cat=" + valeur);
    } else {
      navigate("/recherche");
    }
    window.location.reload();
  }

  return (
    <div>
      <Navbar />
      <form className="d-flex" role="search" id="rechbar">
        <input className="form-control me-2" type="search" aria-label="Search" placeholder="Rechercher ici ce que vous voulez..."/>
        <button className="btn btn-outline-success" onClick={handleSearch}>Rechercher</button>
      </form>
      <div className="wrapper">
        <nav id="sidebar">
        <p>Filtrer par catégorie</p>
          <div className="form-check">
          {categories.map((e, i) => (
            <div key={i}>
              <input className="form-check-input" type="radio" name="categorie" id={e.IDCategorie} value={e.IDCategorie}/>
              <label className="form-check-label" htmlFor={e.IDCategorie}>{e.Nom}</label>
            </div>
          ))}
          </div>
        </nav>
        <div >
        {annonce.slice(num_page * 5 - 5, num_page * 5).map((e, i) => (
          <div className="annonce" key={i}>
            <Annonce data={e} />
          </div>
        ))}   
        </div>
        </div>   
        <ul className="pagination">
          {num_page > 1 ? (
            <li className="page-item">
              <button className="page-link" onClick={handlePagePrec}>Page précédente</button>
            </li>
          ) : (
            ""
          )}
          <li className="page-item">
            <button className="page-link">{num_page}</button>
          </li>
          {num_page + 1 <= total_page ? (
            <li className="page-item">
              <button className="page-link" onClick={handlePageSuiv}>Page suivante</button>
            </li>
          ) : (
            ""
          )}
        </ul>
      
    </div>
  );
};

export default Recherche;
