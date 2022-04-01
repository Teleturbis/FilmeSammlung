import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineLike } from 'react-icons/ai';

function Hot({ films }) {
  const [hotFilms, setHotFilms] = useState([]);
  if (hotFilms) {
    console.log(hotFilms);
  }

  useEffect(() => {
    if (films.length > 0) {
      setHotFilms(films.filter((film) => film.voting > 1000));
    }
  }, [films]);

  return (
    <div className="hotFilmsContainer">
      {hotFilms.length > 0 &&
        hotFilms.map((film) => (
          <NavLink
            key={uuidv4()}
            to={`/film/${film.filmid}`}
            className="hotNavLink"
          >
            <div
              className="hotCard"
              style={{ backgroundImage: `url(${film.preview})` }}
            >
              <div className="card-content">
                <p className="hotTitle">{film.title}</p>
                <p className="hotPoints">
                  <AiOutlineLike /> {film.voting}
                </p>
              </div>
            </div>
          </NavLink>
        ))}
    </div>
  );
}

export default Hot;
