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
    <nav className="navbar navbar-expand-lg bg-light">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"><Link to="/" className="nav-link">Acceuil</Link></li>
          <li className="nav-item"><Link to="/categories" className="nav-link">Catégories</Link></li>
          
          {(ID==null) && (
            <>
            <li className="nav-item"><Link to="/connexion" className="nav-link">Se connecter</Link></li>
            <li className="nav-item"><Link to="/inscription" className="nav-link">S'inscrire</Link></li></>
          )}
           
        {(ID!=null) && (
          <>
          <li className="nav-item"><Link to="/profil" className="nav-link">Profil</Link></li>
          <li className="nav-item"><Link to="/poster" className="nav-link">Poster une annonce</Link></li></> 
        )} 
        {(IDA!=null) && (
        <>
        <li className="nav-item"><Link to="/admin" className="nav-link">Administration</Link></li></>
        )}
        {(ID!=null) &&
        (<><li className="nav-item"><button onClick={handleDeco} className="nav-link">Déconnexion</button></li></>
        )}      
        </ul>
    </nav>
  )
}
