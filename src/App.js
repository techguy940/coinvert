import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Navbar from './components/Navbar.js';
import Homepage from './components/Homepage.js';
import Features from './components/Features.js';
import ReactCountryFlag from "react-country-flag";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feature from './components/Feature.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={
          <div>
            <Navbar />
            <Homepage />
            <Features />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
