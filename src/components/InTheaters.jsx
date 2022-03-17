import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import * as Contentful from "contentful";
import "../assets/style.css";

export default function InTheaters({ film }) {
  const [inTheatersArr, setInTheatersArr] = useState(false);

  const client = Contentful.createClient({
    space: "5o4kejg5nlut",
    accessToken: "IPErBwAcWvsPYzYEBdLbsMibGKstWOFf7yPBwZHWMSo",
    host: "cdn.contentful.com",
  });

  useEffect(async () => {
    let fetching = await client.getEntries({
      content_type: "newFilmsInTheater",
    });
    setInTheatersArr(fetching.items);
  }, []);

  useEffect(() => console.log("inTheatersArr", inTheatersArr), []);

  return (
    <div className="InTheatersContainer" style={{ heigth: "200rem" }}>
      <hr className="Line"></hr>
      <h2>Im Kino</h2>
      <hr className="Line"></hr>
      {inTheatersArr.length > 0 ? (
        inTheatersArr.map((element, index) => {
          <NavLink to={`/film/${element.sys.id}`}>
            <div className="maincontainer--card">
              <div className="thecard">
                <div
                  style={{
                    backgroundImage: `url(${element.fields.previewImage})`,
                  }}
                  className="card--container"
                  key={index}
                ></div>
                <div className="theback">
                  <h2>{element.fields.title}</h2>
                  <p>In Theaters since: {element.fields.date}</p>
                  <p>Length: {element.fields.lengthInMin} min</p>
                  <p>Genre: {element.fields.genres[0]}</p>
                </div>
              </div>
            </div>
          </NavLink>;

          console.log("ELEMENT", element);
        })
      ) : (
        <p>HALLO WELT!</p>
      )}
    </div>
  );
}
