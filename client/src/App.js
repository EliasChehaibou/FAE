import React, {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import "./App.css"
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Inscription from './pages/Inscription/Inscription'

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
          <Route path="/*" element={<NotFound />} />
        </Routes>
    </div>   
  );
}

export default App;
