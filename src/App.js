import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.js';
import Homepage from './components/Homepage.js';
import Features from './components/Features.js';
import Contactus from './components/Contactus.js';
import Footer from './components/Footer.js';
import MarqueeCon from './components/MarqueeCon.js';
import News from './components/News.js';
import Convert from './components/Convert.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
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
