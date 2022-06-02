import React from "react";
import Navbar from "../../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  function handleSearch() {
    if (document.getElementById("rech").value) {
      navigate("/recherche?rech=" + document.getElementById("rech").value);
    } else {
      navigate("/recherche");
    }
  }

  return (
    <div className="Home">
      <div className="logo">
        <img src="/static/logo.png" alt="Foncez aux enchères" className="img" />
      </div>

      <h1 className="titre">Chez FAE on a tout ce qu'on veut !</h1>
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
    </div>
  );
};

export default Home;
