import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Actors({ actors }) {
  const [showAll, setShowAll] = useState(false);
  const [showFirstTen, setShowFistTen] = useState(false);

  useEffect(() => {
    let tempArr = [];
    for (let i = 0; i < 9; i++) {
      tempArr[i] = (
        <NavLink
          to={`/search/actors/${actors[i]}`}
          className="ulFilmDetailsParagraph"
          key={i}
        >
          {actors[i]}
        </NavLink>
      );
    }
    tempArr.push(
      <p
        className="ulFilmDetailsParagraph showMoreActors"
        key="10"
        onClick={() => setShowAll(true)}
      >
        Weitere Laden..
      </p>
    );
    setShowFistTen(tempArr);
  }, []);

  return (
    <div>
      {showAll
        ? actors.map((el, index) => (
            <NavLink
              to={`/search/actors/${el}`}
              className="ulFilmDetailsParagraph"
              key={index}
            >
              {el}
            </NavLink>
          ))
        : showFirstTen}
    </div>
  );
}
