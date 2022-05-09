import React, {useState, useEffect} from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

export default function Navbar() {
  const [ID, setID] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [largeur, setLargeur] = useState(window.innerWidth)

  const toggleNavSmallScreen = () => {
    setToggleMenu(!toggleMenu);
  }

  let navigate = useNavigate();

  useEffect( () => {
      setID(ReactSession.get("IDUtilisateur"));
      const changeWidth = () => {
        setLargeur(window.innerWidth);
        if (window.innerWidth>500){
          setToggleMenu(false);
        }
      }

      window.addEventListener('resize', changeWidth);

      return () => {
        window.removeEventListener('resize', changeWidth);
      }

  }, [])

  function handleDeco(){
    ReactSession.set("IDUtilisateur", null);
    navigate('/');
  }

  
  return (
    <nav>
      {(toggleMenu || largeur>500) && (
        <ul className='liste'>
          <li className='items'><Link to="/" className='link'>Acceuil</Link></li>
          <li className='items'><Link to="/categories" className='link'>Catégories</Link></li>
          
          {(ID==null) && (
            <>
            <li className='items'><Link to="/connexion" className='link'>Se connecter</Link></li>
            <li className='items'><Link to="/inscription" className='link'>S'inscrire</Link></li></>
          )

          }
           
        {(ID!=null) && (
          <>
          <li className='items'><Link to="/profil" className='link'>Profil</Link></li>
          <li className='items'><button onClick={handleDeco} className='button'>Déconnexion</button></li></>
        )}        
        </ul>
        )}
        <button onClick={toggleNavSmallScreen} className='btn'>Déplier</button>
    </nav>
  )
}
