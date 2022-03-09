import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  return (
    <div className="headerDiv">
      <h1>
        <NavLink className="headlineNavLink" to="/">
          The Collector
        </NavLink>
      </h1>
      <nav className="headerNavbar">
        <NavLink className="navLink" to="/genre">
          Genre
        </NavLink>
        <NavLink className="navLink" to="/recommed">
          Empfehlungen
        </NavLink>
        <NavLink className="navLink" to="/soon">
          Coming Soon
        </NavLink>
        <NavLink className="navLink" to="/hot">
          Hot
        </NavLink>
      </nav>
    </div>
  );
}
