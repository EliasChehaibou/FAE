import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import {
  achImUser,
  deleteAnnonce,
  enchereUser,
  searchDetail,
} from "../../rest/search";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./Detail.css";

const Detail = () => {
  var urlcourante = document.location.href;
  var url = new URL(urlcourante);
  var search_params = new URLSearchParams(url.search);
  var IDAnnonce = search_params.get("ida");

  const IDUtilisateur = ReactSession.get("IDUtilisateur");
  const IDAdmin = ReactSession.get("IDAdmin");

  const [annonce, setAnnonce] = useState({});
  const [enchere, setEnchere] = useState();
  const [achim, setAchim] = useState(false);
  const [dateRest, setDateRest] = useState("00j 00h 00m 00s");
  let enchereValid = false;
  const navigate = useNavigate();
  const socket = io("http://localhost:2001");

  useEffect(() => {
    searchDetail(IDAnnonce).then((response) => {
      timeRest(response.data[0].DateFin);
      setAnnonce(response.data[0]);
      setEnchere(response.data[0].Enchere);
    });

    socket.on("res_encherir", (arg) => {
      console.log(arg);
      enchereValid = arg.ok;
      if (enchereValid) {
        setEnchere(arg.val);
      }
    });
  }, []);

  function handleEnchereS() {
    let ench = parseInt(document.getElementById("ench").value);
    if (ench && ench > enchere) {
      let value = { IDUtilisateur, ench, IDAnnonce };
      console.log(ench);
      socket.emit("encherir", value);

      console.log(enchereValid);
    } else {
      alert("enchère invalide");
    }
  }

  function handleAchIm() {
    achImUser(IDUtilisateur, annonce.IDAnnonce);
    setAchim(true);
  }

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
  function timeRest(date) {
    var countDownDate = new Date(date).getTime();
    // Update the count down every 1 second
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();
      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      setDateRest(days + "j " + hours + "h " + minutes + "m " + seconds + "s ");

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        setDateRest("EXPIRED");
      }
    }, 1000);
  }

  function handleDeleteAnnonce() {
    deleteAnnonce(annonce);
    navigate("/");
    alert("annonce supprimée");
  }

  return (
    <div>
      <Navbar />
      {!achim ? (
        <div className="center">
          <div>
          <img src={annonce.Image} className="img-thumbnail"></img>
          <div>Titre de l'annonce : {annonce.Titre}</div>
          <div>Description : {annonce.Description}</div>
          <div>Enchère de départ : {annonce.EnchereDepart}€</div>
          <div>Enchère actuelle : {enchere!=null ? <>{enchere}€</>: <>Aucune enchère pour le moment</>}</div>
          <div>Fin de la vente le : {setDate(annonce.DateFin)}</div>
          <div>Temps restant : {dateRest}</div>
          {IDUtilisateur ? (
            <>
              <div>
                <input
                  style={{marginTop:'2%'}} 
                  type="text"
                  className="form-control"
                  id="ench"
                  placeholder="Tapez le montant de votre enchère en €"
                />
                <button style={{marginTop:'1%'}} className="btn btn-light" onClick={handleEnchereS}>Enchérir</button>
              </div>
              {annonce.IsAchIm == 1 ? (
                <button className="btn btn-dark" style={{marginTop:'2%'}}  onClick={handleAchIm}>
                  Acheter maintenant pour {annonce.AchatImmediat}€
                </button>
              ) : (
                ""
              )}{" "}
            </>
          ) : (
            <>
              Pour enchérir ou acheter ce produit veuillez vous{" "}
              <a href="/connexion">connecter</a> ou vous{" "}
              <a href="/inscription">inscrire</a>.
            </>
          )}
          {IDAdmin ? (
            <div><button className="btn btn-danger" style={{marginTop:'5%'}} onClick={handleDeleteAnnonce}>Supprimer l'annonce</button></div>
          ) : (
            ""
          )}
        </div>
        </div>
      ) : (
        <>
          Félicitations ! Vous avez acheté l'offre n : {IDAnnonce}, vous pouvez
          consulter votre <a href="/historique">historique</a>.
        </>
      )}
    </div>
  );
};

export default Detail;