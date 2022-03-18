import React, { useState } from "react";
import Modal from "./Modal.jsx";
import { useNavigate } from "react-router-dom";

export default function LogIn({ client, userLoggedIn, user }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [modal, setModal] = useState(false);
  let navigate = useNavigate();

  function handleLogIn() {
    client
      .getEntries({
        content_type: "user",
        "fields.username": usernameInput.toLowerCase(),
      })
      .then((response) => {
        if (
          response.items[0] &&
          response.items[0].fields.password === passwordInput
        ) {
          userLoggedIn(usernameInput, response.items[0].fields.uuid);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("userName", usernameInput);
          localStorage.setItem("id", response.items[0].fields.uuid);
          navigate("/user");
        } else if (response.items[0]) {
          window.alert("FALSCHES PASSWORT");
        }
      })
      .catch((err) => window.alert("ALERT User nicht gefunden | ", err));
    setPasswordInput("");
    setUsernameInput("");
  }

  function handleRegistration() {
    setModal(true);
  }

  function changeModalDisplayed() {
    setModal(!modal);
  }

  return (
    <div>
      {modal ? (
        <Modal client={client} changeModalDisplayed={changeModalDisplayed} />
      ) : null}
      {
        <div className="loginForm">
          <input
            className="modalElement"
            type="text"
            placeholder="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <input
            className="modalElement"
            type="password"
            placeholder="Passwort"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <input
            className="modalElement modalBtn"
            type="button"
            value="LogIn"
            onClick={() => handleLogIn()}
          />
          <input
            className="modalElement modalBtn"
            type="button"
            value="Registrieren"
            onClick={() => handleRegistration()}
          />
        </div>
      }
    </div>
  );
}
