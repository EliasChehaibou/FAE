import { React } from "react";
import "./Annonce.css";

const Annonce = (props) => {

  function setDate(annonceDate) {
    var myDate = new Date(annonceDate);
    return (
      myDate.getDate() +
      1 +
      "/" +
      myDate.getMonth() +
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
      <img className="img-thumbnail" id="photo" src={props.data.Image}></img>
      <div className="informations">
        <div>
          <div>
            Titre de l'annonce :{" "}
            <a href={"./detail?ida=" + props.data.IDAnnonce}>
              {props.data.Titre}
            </a>
          </div>
          <div>Enchère de départ : {props.data.EnchereDepart}€</div>
          {props.data.Enchere!=null ? <div>Enchere actuelle : {props.data.Enchere}€</div> : ''}
          {props.data.IsAchIm==1 ? <div>Achat immédiat : {props.data.AchatImmediat}€</div>:'' }
          
          <div>Fin de la vente le : {setDate(props.data.DateFin)}</div>
        </div>
      </div>
    </div>
  );
};

export default Annonce;
