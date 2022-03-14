import React, { useState, useEffect } from "react";
import Modal from "./Modal.jsx";

export default function LogIn({ client, userLoggedIn }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [modal, setModal] = useState(false);

  function handleLogIn() {
    client
      .getEntries({
        content_type: "user",
        "fields.username": usernameInput,
      })
      .then((response) => {
        if (
          response.items[0] &&
          response.items[0].fields.password === passwordInput
        ) {
          userLoggedIn(usernameInput, response.items[0].fields.uuid);
        } else if (response.items[0]) {
          window.alert("FALSCHES PASSWORT");
        }
      })
      .catch(err => window.alert("ALERT User nicht gefunden | ", err));
      setPasswordInput("")
      setUsernameInput("")
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
      <div>
        <input
          type="text"
          placeholder="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <input type="button" value="LogIn" onClick={() => handleLogIn()} />
      </div>
      <input
        type="button"
        value="Registrieren"
        onClick={() => handleRegistration()}
      />
    </div>
  );
}
