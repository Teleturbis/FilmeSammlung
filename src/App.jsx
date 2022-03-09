import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Contentful from "contentful";
import Header from "./components/general/Header.jsx";
import Footer from "./components/general/Footer.jsx";
import "./assets/style.css";

function App() {
  return (
    <div>
      <Header />
      <div>
        <p>Hier kommt content rein</p>
      </div>
      <Footer />
    </div>
  );
}

export default App;
