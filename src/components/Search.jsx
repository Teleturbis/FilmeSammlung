import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Search({ films }) {
  const [searchName, setSearchName] = useState(false);
  const [searchResult, setSearchResult] = useState(false);

  function handleSearch() {
    let tempArr = [];
    if (films) {
      tempArr = films.map((el) => {
        if (
          el.fields.director.toLowerCase().includes(searchName) ||
          el.fields.company.toLowerCase().includes(searchName) ||
          el.fields.actors.includes(searchName) ||
          el.fields.genres.includes(searchName) ||
          el.fields.title.toLowerCase().includes(searchName)
        ) {
          return el;
        } else {
          /* el.fields.actors.map((actor) => {
            if (actor.toLowerCase().includes(searchName)) {
              return el;
            } else return null;
          });

          el.fields.genres.map((genre) => {
            if (genre.toLowerCase().includes(searchName)) {
              return el;
            } else return null;
          }); */
          return null
        }
      });
      console.log("temp", tempArr);
      setSearchResult(tempArr.filter((el) => el !== null));
    }
  }

  console.log("SEARCH", searchResult);

  return (
    <div>
      <div>
        <input type="text" onChange={(e) => setSearchName(e.target.value)} />
        <input type="button" value="Suchen!" onClick={() => handleSearch()} />
      </div>
      <div className="genreList">
        <h3>{searchName}</h3>
        <div className="filmsDiv">
          {searchResult &&
            searchResult.map((film, index) => (
              <NavLink
                style={{ backgroundImage: `url(${film.fields.previewImage})` }}
                className="cardGenre"
                to={`/film/${film.sys.id}`}
                key={index}
              >
                <h4>{/*film.fields.title*/}</h4>
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
}
