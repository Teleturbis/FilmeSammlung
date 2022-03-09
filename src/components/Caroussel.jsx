import React, { useState } from 'react';

function Caroussel({ randomFilms }) {
  if (randomFilms) {
    console.log(randomFilms[0]);
  }
  // console.log(randomFilms[0].fields.title);
  // console.log(randomFilms[0].fields.previewImage.fields.file.url);

  const [indexNumber, setIndexNumber] = useState(0);

  const nextPicture = () => {
    if (indexNumber == 2) {
      setIndexNumber(0);
    } else {
      setIndexNumber(indexNumber + 1);
    }
  };

  const previousPicture = () => {
    if (indexNumber == 0) {
      setIndexNumber(2);
    } else {
      setIndexNumber(indexNumber - 1);
    }
  };

  return (
    <div>
      <button onClick={() => previousPicture()}>Left</button>
      {randomFilms.length && (
        <img
          src={randomFilms[indexNumber].fields.previewImage.fields.file.url}
          alt=""
          className="animation"
        />
      )}
      <button onClick={() => nextPicture()}>Right</button>
    </div>
  );
}

export default Caroussel;
