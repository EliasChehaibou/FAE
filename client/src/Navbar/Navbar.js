import React, {useState, useEffect} from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

export default function Navbar() {
  const [ID, setID] = useState(null);
  const [IDA, setIDA] = useState(null);



  let navigate = useNavigate();

  useEffect( () => {
      setID(ReactSession.get("IDUtilisateur"));
      setIDA(ReactSession.get("IDAdmin"));

  }, [])

  function handleDeco(){
    ReactSession.set("IDUtilisateur", null);
    ReactSession.set("IDAdmin", null);
    navigate('/');
    window.location.reload()
  }

  
  return (
    <nav class="navbar navbar-expand-lg bg-light">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><Link to="/" class="nav-link">Acceuil</Link></li>
          <li class="nav-item"><Link to="/categories" class="nav-link">Catégories</Link></li>
          
          {(ID==null) && (
            <>
            <li class="nav-item"><Link to="/connexion" class="nav-link">Se connecter</Link></li>
            <li class="nav-item"><Link to="/inscription" class="nav-link">S'inscrire</Link></li></>
          )}
           
        {(ID!=null) && (
          <>
          <li class="nav-item"><Link to="/profil" class="nav-link">Profil</Link></li>
          <li class="nav-item"><Link to="/poster" class="nav-link">Poster une annonce</Link></li></> 
        )} 
        {(IDA!=null) && (
        <>
        <li class="nav-item"><Link to="/admin" class="nav-link">Administration</Link></li></>
        )}
        {(ID!=null) &&
        (<><li class="nav-item"><button onClick={handleDeco} class="nav-link">Déconnexion</button></li></>
        )}      
        </ul>
    </nav>
  )
}
