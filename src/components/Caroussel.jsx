import React, { useEffect, useState } from 'react';

function Caroussel({ randomFilms }) {
  // console.log(randomFilms[0].fields.title);
  // console.log(randomFilms[0].fields.previewImage.fields.file.url);

  let [indexNumber, setIndexNumber] = useState(0);
  const [cssClass, setCssClass] = useState([
    'fadein-animation',
    'fadeout-animation',
  ]);
  console.log(indexNumber, 'indexNumber');
  console.log(randomFilms, 'randomFilms');
  console.log(cssClass, 'cssclass');

  const nextPicture = () => {
    if (indexNumber === 2) {
      setIndexNumber(0);
    } else {
      setIndexNumber(indexNumber + 1);
    }
  };

  const previousPicture = () => {
    if (indexNumber === 0) {
      setIndexNumber(2);
    } else {
      setIndexNumber(indexNumber - 1);
    }
  };

  useEffect(() => {
    setCssClass(cssClass);
  }, [indexNumber]);

  return (
    <div className="carousselFrame">
      <button onClick={() => previousPicture()}>Left</button>
      <div className="carousselContainer">
        {randomFilms.length && (
          <>
            <img
              src={randomFilms[indexNumber].fields.previewImage}
              alt=""
              className={`${cssClass[0]} carousselPicture`}
            />
            <img
              src={
                randomFilms[
                  indexNumber === 2 ? (indexNumber = 0) : indexNumber + 1
                ].fields.previewImage
              }
              alt=""
              className={`${cssClass[1]} carousselPicture`}
            />
          </>
        )}
      </div>
      <button onClick={() => nextPicture()}>Right</button>
    </div>
  );
}

export default Caroussel;
