import React from "react";
import { NavLink } from "react-router-dom";

export default function GenreLi({ genre, sortedFilms, indexGenres }) {
  if (sortedFilms.length === 0) return <></>;

  console.log("sortedFilms", sortedFilms);

  return (
    <div className="genreList">
      <h3>{genre}</h3>
      <div className="filmsDiv">
        {sortedFilms.map((film, index) => (
          <NavLink
            style={{ backgroundImage: `url(${film.preview})` }}
            className="cardGenre"
            to={`/film/${film.filmid}`}
            key={index}
          >
            <h4>{film.title}</h4>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
