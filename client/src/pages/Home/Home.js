import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { searchExpirees, searchSuggestions } from "../../rest/search";
import Annonce from "../../Annonce/Annonce";


const Home = () => {
  
  const [expirees, setExpirees] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    searchExpirees().then((response) => {
      setExpirees(response.data);
      let IDs = []
      for (let i=0; i<response.data.length; i++) {
        IDs.push(response.data[i].IDAnnonce);
      }
      searchSuggestions(IDs).then((response) => {
        setSuggestions(response.data);
      })  
    })
    .catch(() => {
      // en cas d'erreur
    });;
  }, []);

  function handleSearch() {
    if (document.getElementById("rech").value) {
      navigate("/recherche?rech=" + document.getElementById("rech").value);
    } else {
      navigate("/recherche");
    }
    
  }

  return (
    <div className="Home">
      <Navbar />    
      <form className="d-flex" role="search">
        <input
          id="rech"
          className="form-control me-2"
          type="search"
          aria-label="Search"
          placeholder="Rechercher ici ce que vous voulez..."
        />
        <button className="btn btn-outline-success" onClick={handleSearch}>
        Rechercher
        </button>
      </form>
      <div>
        <h3 style={{marginTop:'0.5%', marginLeft:'0.5%'}}>Suggestions</h3>
        {suggestions.map((e, i) => (
        <div key={i}>
          <Annonce data={e} />
        </div>
      ))}
      </div>
      <div>
        <h3 style={{marginTop:'1%', marginLeft:'0.5%'}}>Bientôt expirées</h3>
        {expirees.map((e, i) => (
        <div key={i}>
          <Annonce data={e} />
        </div>
      ))}
      </div>

      
    </div>
  );
};

export default Home;
