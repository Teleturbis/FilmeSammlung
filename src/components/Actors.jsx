import React, { useState, useEffect } from "react";

export default function Actors({ actors }) {
  const [showAll, setShowAll] = useState(false);
  const [showFirstTen, setShowFistTen] = useState(false);

  useEffect(() => {
    let tempArr = [];
    for (let i = 0; i < 9; i++) {
      tempArr[i] = (
        <p className="ulFilmDetailsParagraph" key={i}>
          {actors[i]}
        </p>
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
            <p className="ulFilmDetailsParagraph" key={index}>
              {el}
            </p>
          ))
        : showFirstTen}
    </div>
  );
}
