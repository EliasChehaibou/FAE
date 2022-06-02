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
          setTotalPage(response.data.length / 10);
        })
        .catch(() => {
          // en cas d'erreur
        });
    } else if (IDcat) {
      searchAnnonceCate(IDcat)
        .then((response) => {
          setAnnonce(response.data);
          setTotalPage(response.data.length / 10);
        })
        .catch(() => {
          // en cas d'erreur
        });
    } else if (rech) {
      searchAnnonceRech(rech)
        .then((response) => {
          setAnnonce(response.data);
          setTotalPage(response.data.length / 10);
        })
        .catch(() => {
          // en cas d'erreur
        });
    } else {
      searchAnnonce()
        .then((response) => {
          setAnnonce(response.data);
          setTotalPage(response.data.length / 10);
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

  function handlePagePlus1() {
    setNumPage(num_page + 1);
  }

  function handlePagePlus2() {
    setNumPage(num_page + 2);
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
      <div className="rech">
        <input
          className="input"
          type="text"
          id="rech"
          placeholder="Rechercher ici ce que vous voulez..."
        />
        <button className="btn_rech" onClick={handleSearch}>
          Rechercher
        </button>
      </div>
      {annonce.slice(num_page * 10 - 10, num_page * 10 - 1).map((e, i) => (
        <div key={i}>
          <Annonce data={e} />
        </div>
      ))}
      {categories.map((e, i) => (
        <div key={i}>
          <input
            type="radio"
            name="categorie"
            id={e.IDCategorie}
            value={e.IDCategorie}
          />
          <label htmlFor={e.IDCategorie}>{e.Nom}</label>
        </div>
      ))}
      <ul>
        {num_page > 1 ? (
          <li>
            <button onClick={handlePagePrec}>Page précédente</button>
          </li>
        ) : (
          ""
        )}
        <li>
          <button>{num_page}</button>
        </li>
        {num_page + 1 <= total_page ? (
          <li>
            <button onClick={handlePagePlus1}>{num_page + 1}</button>
          </li>
        ) : (
          ""
        )}
        {num_page + 2 <= total_page ? (
          <li>
            <button onClick={handlePagePlus2}>{num_page + 2}</button>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default Recherche;
