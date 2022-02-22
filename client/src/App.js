import React, {useState} from 'react'
import Navbar from './Navbar/Navbar'

function App() {
  const [msg,setMsg] = useState('')
  const handleClick = async () => {
    const data = await window.fetch('/api/fae')
    const json = await data.json()
    const msg = json.msg

    setMsg(msg)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <button onClick={handleClick}>FAE</button>
        <p>{msg}</p>
      </header>
    </div>
  );
}

export default App;
