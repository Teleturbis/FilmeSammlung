import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

export default function Header({ user }) {
  return (
    <div className="headerDiv">
      <div className="headlineDiv">
      <h1>
        <NavLink className="headlineNavLink" to="/">
          The Collector
        </NavLink>
      </h1>
      {user.loggedIn ? <p>{user.userName}</p> : null}
      </div>
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
        <NavLink className="navLink" to="/login">
          LogIn
        </NavLink>
      </nav>
    </div>
  );
}
