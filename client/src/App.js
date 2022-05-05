import React, {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import "./App.css"
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Inscription from './pages/Inscription/Inscription'
import Categories from './pages/Categories/Categories'
import Recherche from './pages/Recherche/Recherche'
import Connexion from './pages/Connexion/Connexion'
import Profil from './pages/Profil/Profil'

function App() {
  /*const [msg,setMsg] = useState('')
  const handleClick = async () => {
    const data = await window.fetch('/api/fae')
    const json = await data.json()
    const msg = json.msg

    setMsg(msg)
  }*/

  return (
    <div className='App'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/inscription" element={<Inscription />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/recherche" element={<Recherche />} />
          <Route exact path="/connexion" element={<Connexion />} />
          <Route exact path="/profil" element={<Profil />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
    </div>   
  );
}

export default App;
