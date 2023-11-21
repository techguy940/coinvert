import './App.css';
import { useEffect } from 'react';
import Navbar from './components/Navbar.js';
import Homepage from './components/Homepage.js';
import Features from './components/Features.js';
import Contactus from './components/Contactus.js';
import Footer from './components/Footer.js';
import MarqueeCon from './components/MarqueeCon.js';
import News from './components/News.js';
import Convert from './components/Convert.js';
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const API_KEY = "fc7b3adf6fbe8b882cdeee43";
  const BASE = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`;
  useEffect(() => {
    var history = localStorage.getItem("history");
    var favourites = localStorage.getItem("favourites");
    if (history == null){
      history = JSON.stringify([])
      localStorage.setItem("history", history)
    }
    if (favourites == null){
      favourites = JSON.stringify([])
      localStorage.setItem("favourites", favourites)
    }
    history = JSON.parse(history)
    favourites = JSON.parse(favourites)

    const mixed = history.concat(favourites)
    var count = 0;
    const data = [];
    mixed.forEach(pair => {
      axios.get(`${BASE}/${pair.from}/${pair.to}`)
      .then(res => {
        data.push({"from": pair.from, "to": pair.to, "value": res.data.conversion_rate.toFixed(2)})
        count = count + 1
        if (count === mixed.length){
          localStorage.setItem("recentRates", JSON.stringify(data))
          return
        }
      
      })
      .catch(err => {console.log(err)})
    })
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={
          <div>
            <Navbar />
            <MarqueeCon />
            <Homepage />
            <Features />
            <Contactus />
            <Footer />
          </div>
        } />
        <Route path="/news" element={<News />} />
        <Route path="/convert" element={<Convert />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
