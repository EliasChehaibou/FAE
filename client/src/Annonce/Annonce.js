import React from "react";
import "./Annonce.css";
import logo from "./logo.png";
import dateFormat from "dateformat";
const Annonce = (props) => {
  console.log(props.data);
  return (
    <div className="container">
      <div className="photo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="informations">
        <div>
          Titre de l'annonce:{" "}
          <a href={"./detail?ida=" + props.data.IDAnnonce}>
            {props.data.Titre}
          </a>
        </div>
        <div>Enchere acttuelle: {props.data.Enchere}</div>
        <div>Achat immédiat: {props.data.Enchere}</div>
        <div>
          Fin le: {dateFormat(props.data.DateFin, "dd/MM/yyyy HH:mm:ss")}
        </div>
      </div>
    </div>
  );
};

export default Annonce;
