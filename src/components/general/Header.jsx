import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

export default function Header({ user, userLoggedIn }) {
  function handleLogOut() {
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("userName", "");
    localStorage.setItem("id", "");
    userLoggedIn("", "");
  }

  return (
    <div className="headerDiv">
      <div className="headlineDiv">
        <h1>
          <NavLink className="headlineNavLink" to="/">
            The Collector
          </NavLink>
        </h1>
        {user.loggedIn ? (
          <div className="userNameHeader">
            <input
              type="button"
              value="LogOut"
              onClick={() => handleLogOut()}
            />
            <p>{user.userName}</p>
          </div>
        ) : null}
      </div>
      <nav className="headerNavbar">
        <NavLink className="navLink" to="/search">
          Suche
        </NavLink>
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
        {user.loggedIn ? <NavLink className="navLink" to="/user">Mein Bereich</NavLink> : <NavLink className="navLink" to="/user/login">
          LogIn
        </NavLink>}
      </nav>
    </div>
  );
}
