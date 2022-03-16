import React, { useState, useEffect } from "react";
import * as Contentful from "contentful";
import { v4 as uuidv4 } from "uuid";

export default function Modal({ changeModalDisplayed }) {
  const contentful = require("contentful-management");

  const client = contentful.createClient({
    accessToken: "CFPAT-S5oAg2kMuovvHDIwpQby-X6UjykGBnxmkP1y5lPvpKM",
  });

  const getClient = Contentful.createClient({
    space: "5o4kejg5nlut",
    accessToken: "IPErBwAcWvsPYzYEBdLbsMibGKstWOFf7yPBwZHWMSo",
    host: "cdn.contentful.com",
  });

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  function handleRegistration() {
    if (usernameInput !== "") {
      getClient
        .getEntries({
          content_type: "user",
          "fields.username": usernameInput,
        })
        .then((response) => {
          response.items.length >= 1
            ? window.alert("Username ist bereits vergeben!")
            : createNewUser();
        })
        .catch((err) => console.error("Userabfrage: ", err));
    } else {
      window.alert("Bitte Username eingeben!");
    }
  }

  function createNewUser() {
    if (passwordInput !== "") {
      const id = uuidv4();
      client
        .getSpace("5o4kejg5nlut")
        .then((space) => space.getEnvironment("master"))
        .then((environment) =>
          environment.createEntry("user", {
            fields: {
              username: { "en-US": usernameInput },
              password: { "en-US": passwordInput },
              uuid: { "en-US": id },
            },
          })
        )
        .then((entry) => entry.publish())
        .catch((err) => console.error("upload new User", err));

      setTimeout(() => {
        client
          .getSpace("5o4kejg5nlut")
          .then((space) => space.getEnvironment("master"))
          .then((environment) =>
            environment.createEntry("listOfUsernamens", {
              fields: {
                userName: { "en-US": usernameInput },
                userId: { "en-US": id },
              },
            })
          )
          .then((entry) => entry.publish());
      }, 2500);

      setPasswordInput("");
      setUsernameInput("");
      changeModalDisplayed();
    } else {
      window.alert("Bitte Passwort eingeben!");
    }
  }

  function handleClickOnModal(e) {
    if (e.target.className === "modal") {
      changeModalDisplayed();
    }
  }

  return (
    <div className="modal" onClick={(e) => handleClickOnModal(e)}>
      <div className="innerModal">
        <input
          className="modalElement"
          type="text"
          placeholder="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value.toLowerCase())}
        />
        <input
          className="modalElement"
          type="password"
          placeholder="Passwort"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value.toLowerCase())}
        />
        <input
          className="modalElement modalBtn"
          type="button"
          value="Registrieren"
          onClick={() => handleRegistration()}
        />
      </div>
    </div>
  );
}
