import React from 'react'
import {Route, Routes} from 'react-router-dom'
import "./App.css"
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Inscription from './pages/Inscription/Inscription'
import Categories from './pages/Categories/Categories'
import Recherche from './pages/Recherche/Recherche'
import Connexion from './pages/Connexion/Connexion'
import Profil from './pages/Profil/Profil'
import Detail from './pages/Detail/Detail'
import Historique from './pages/Historique/Historique'
import Poster from './pages/Poster/Poster'
import Admin from './pages/Admin/Admin'

function App() {

  return (
    <div className='App'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/inscription" element={<Inscription />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/recherche" element={<Recherche />} />
          <Route exact path="/connexion" element={<Connexion />} />
          <Route exact path="/profil" element={<Profil />} />
          <Route exact path="/detail" element={<Detail />} />
          <Route exact path="/historique" element={<Historique />} />
          <Route exact path="/poster" element={<Poster />} />
          <Route exact path="/admin" element={<Admin/>} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
    </div>   
  );
}

export default App;
