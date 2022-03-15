import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

export default function GenreLi({ genre, sortedFilms, indexGenres }) {
  if (sortedFilms.length === 0) return <></>;

  return (
    <div className="genreList">
      <h3>
        {genre}
      </h3>
      <div className="filmsDiv">
        {sortedFilms.map((film, index) => (
          <NavLink
            style={{ backgroundImage: `url(${film.fields.previewImage})` }}
            className="cardGenre"
            to={`/film/${film.sys.id}`}
            key={index}
          >
            <h4>
              {film.fields.title}
            </h4>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
