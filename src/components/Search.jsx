import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Search({ films }) {
  const [searchName, setSearchName] = useState(false);
  const [searchResult, setSearchResult] = useState(false);

  function handleSearch() {
    let tempArr = [];
    if (films) {
      console.log("temp1", tempArr);
      tempArr = films.map((el) =>
        el.fields.company.includes(searchName) ? el : null
      );
      tempArr.push(
        films.map((el) => {
          if (
            el.fields.actors.includes(searchName) ||
            el.fields.director.includes(searchName) ||
            el.fields.genres.includes(searchName) ||
            el.fields.title.includes(searchName)
          ) {
            return el;
          }
        })
      );
      console.log("temp2", tempArr);
      setSearchResult(tempArr.filter((el) => el !== null));
    }
  }

  return (
    <div>
      <div>
        <input type="text" onChange={(e) => setSearchName(e.target.value)} />
        <input type="button" value="Suchen!" onClick={() => handleSearch()} />
      </div>
      <div className="genreList">
        <h3>{/* searchName */}</h3>
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
