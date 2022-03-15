import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

export default function Search({ films }) {
  const { searchName } = useParams();

  const [searchResult, setSearchResult] = useState(false);

  useEffect(() => {
    let tempArr = [];
    if (films) {
      tempArr = films.map((el) =>
        el.fields.genres.includes(searchName) ? el : null
      );
      setSearchResult(tempArr.filter((el) => el !== null));
    }
  }, [films]);

  return (
    <div className="genreList">
      <h3>{searchName}</h3>
      <div className="filmsDiv">
        {searchResult && searchResult.map((film, index) => (
          <NavLink
            style={{ backgroundImage: `url(${film.fields.previewImage})` }}
            className="cardGenre"
            to={`/film/${film.sys.id}`}
            key={index}
          >
            <h4>{film.fields.title}</h4>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
