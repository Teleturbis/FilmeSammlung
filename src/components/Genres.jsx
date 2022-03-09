import React, { useState, useEffect } from 'react';

export default function Genres({ films, client }) {
  const arr = [];
  const [genresArr, setGenresArr] = useState(false);

  useEffect(() => {
    client
      .getEntries({ content_type: 'genres' })
      .then((response) => console.log('Genres von Contentful: ', response)) // =====> MUST BE ASYNC
      .then((response) => setGenresArr(response));
    sortFilms();
  });

  function sortFilms() {
    if (genresArr) {
      for (let i = 0; i < genresArr.length; i++) {
        arr[i] = films.filter((el) => el.fields.genre === genresArr[i]);
      }
    }
  }

  console.log('Sortiert: ', arr);

  return <div>Genres</div>;
}
