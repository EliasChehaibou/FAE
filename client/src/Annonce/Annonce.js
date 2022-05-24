import React from "react";
import "./Annonce.css";
import logo from "./logo.png";
const Annonce = (props) => {
  console.log(props.data);
  function setDate(annonceDate) {
    var myDate = new Date(annonceDate);
    return (
      myDate.getMonth() +
      1 +
      "/" +
      myDate.getDate() +
      "/" +
      myDate.getFullYear() +
      " à " +
      myDate.getHours() +
      " heures et " +
      myDate.getMinutes() +
      " minutes."
    );
  }

  return (
    <div className="container">
      <div className="photo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="informations">
        <div>
          <div>
            Titre de l'annonce:{" "}
            <a href={"./detail?ida=" + props.data.IDAnnonce}>
              {props.data.Titre}
            </a>
          </div>
          <div>Enchere acttuelle: {props.data.Enchere}</div>
          <div>Achat immédiat: {props.data.Enchere}</div>
          <div>Fin le: {setDate(props.data.DateFin)}</div>
        </div>
      </div>
    </div>
  );
};

export default Annonce;
