import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Hot({ films }) {
  const [hotFilms, setHotFilms] = useState([]);

  useEffect(() => {
    if (films.length > 0) {
      setHotFilms(films.filter((film) => film.fields.voting > 1000));
    }
  }, [films]);

  return (
    <div className="hotFilmsContainer">
      {hotFilms.length > 0 &&
        hotFilms.map((film) => (
          <div key={uuidv4()} className="hotCard">
            <h4 className="hotTitle">{film.fields.title}</h4>
            <NavLink to="">
              <img
                className="hotPreviewImage"
                src={film.fields.previewImage}
                alt="previewImage"
              />
            </NavLink>
          </div>
        ))}
    </div>
  );
}

export default Hot;
