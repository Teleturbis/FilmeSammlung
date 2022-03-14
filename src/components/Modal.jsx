import React, { useState, useEffect } from "react";
import * as Contentful from "contentful";

export default function Modal({ changeModalDisplayed }) {
  const contentful = require("contentful-management");

  const client = contentful.createClient({
    accessToken: "CFPAT-pgfxlbHoIVQa2aR_EVhdi-52Hcgeu9hACk-DM-fW0Ow",
  });

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [newUser, setNewUser] = useState(false);

  function handleRegistration() {
    if (usernameInput !== "") {
      if (passwordInput !== "") {
        client
          .getSpace("5o4kejg5nlut")
          .then((space) => space.getEnvironment("master"))
          .then((environment) =>
            environment.createEntry("user", {
              fields: {
                username: { "en-US": usernameInput },
                password: { "en-US": passwordInput },
              },
            })
          ).then(entry => entry.publish())
          .then((entry) => console.log("upload", entry))
          .catch(console.error);
          setPasswordInput("")
          setUsernameInput("")
      } else {
        window.alert("Bitte Passwort eingeben!");
      }
    } else {
      window.alert("Bitte Username eingeben!");
    }
  }

  /*
.then((environment) => environment.createAssetFromFiles({
  fields: {
    title: {
      'en-US': 'Asset title'
    },
    description: {
      'en-US': 'Asset description'
    },
    file: {
      'en-US': {
        contentType: 'image/svg+xml',
        fileName: 'circle.svg',
        file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
      }
    }
  }
}))
.then((asset) => asset.processForAllLocales())
.then((asset) => asset.publish())
.catch(console.error)
  */

  useEffect(() => {
    if (newUser) {
      client
        .getSpace("5o4kejg5nlut")
        .then((space) => space.getEnvironment("master"))
        .then((environment) => environment.getAsset(newUser.sys.id))
        .then((asset) => asset.publish())
        .then((asset) => console.log(`Asset ${asset.sys.id} published.`))
        .catch(console.error);
    }
  }, [newUser]);

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
          value="Log In"
          onClick={() => handleRegistration()}
        />
      </div>
    </div>
  );
}
