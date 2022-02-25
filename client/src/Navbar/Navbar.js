import React, {useState, useEffect} from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';

export default function Navbar() {

  const [toggleMenu, setToggleMenu] = useState(false);
  const [largeur, setLargeur] = useState(window.innerWidth)

  const toggleNavSmallScreen = () => {
    setToggleMenu(!toggleMenu);
  }

  useEffect( () => {

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

  return (
    <nav>
      {(toggleMenu || largeur>500) && (
        <ul className='liste'>
          <li className='items'><Link to="/" className='link'>Acceuil</Link></li>
          <li className='items'><Link to="/categories" className='link'>Catégories</Link></li>
          <li className='items'><Link to="/signin" className='link'>S'inscire</Link></li>
        </ul>
        )}
        <button onClick={toggleNavSmallScreen} className='btn'>Déplier</button>
    </nav>
  )
}
