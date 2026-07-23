import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [message, setMessage] = useState("Loading...");

  // Fetch data from the backend when the component loads
  useEffect(() => {
    fetch('http://localhost:7000/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error("Error fetching data:", err);
        setMessage("Failed to connect to backend.");
      });
  }, []);


  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
        </div>
        <p>Message from backend "{message}"</p>
      </section>
      <div className="ticks"></div>
    </>
  )
}

export default App
