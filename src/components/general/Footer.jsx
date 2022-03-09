import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footerComp">
      <div className="footerDiv">
        <NavLink to="/123" target="_blank">
          Impressum
        </NavLink>

        <div className="socialMediaDiv">
          <NavLink to="/123" target="_blank">
            <i className="fa-brands fa-github"></i>
          </NavLink>
          <NavLink to="/123" target="_blank">
            <i className="fa-brands fa-instagram"></i>
          </NavLink>
          <NavLink to="/123" target="_blank">
            <i className="fa-brands fa-twitter-square"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
