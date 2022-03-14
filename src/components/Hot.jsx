import React, { useEffect, useState } from 'react';

function Hot({ films }) {
  const [hotFilms, setHotFilms] = useState([]);
  console.log(hotFilms);

  useEffect(() => {
    if (films) {
      setHotFilms(films.filter((film) => film.fields.voting > 1000));
    }
  }, [films]);

  return (
    <div>
      <ul>
        {hotFilms && hotFilms.map((film) => <li>{film.fields.title}</li>)}
      </ul>
    </div>
  );
}

export default Hot;
