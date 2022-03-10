import React, { useEffect, useState } from 'react';

function Caroussel({ randomFilms }) {
  // console.log(randomFilms[0].fields.title);
  // console.log(randomFilms[0].fields.previewImage.fields.file.url);

  let [indexNumber, setIndexNumber] = useState(0);

  const [pic1, setPic1] = useState();
  const [pic2, setPic2] = useState();
  const [pic3, setPic3] = useState();

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

  function cssClass() {
    if (indexNumber === 0) {
      setPic1('fadein-animation carousselPicture');
      setPic2('hidden');
      setPic3('fadeout-animation carousselPicture');
    } else if (indexNumber === 1) {
      setPic1('fadeout-animation carousselPicture');
      setPic2('fadein-animation carousselPicture');
      setPic3('hidden');
    } else {
      setPic1('hidden');
      setPic2('fadeout-animation carousselPicture');
      setPic3('fadein-animation carousselPicture');
    }
  }

  useEffect(() => {
    cssClass();
  }, [indexNumber]);

  return (
    <div className="carousselFrame">
      <button onClick={() => previousPicture()}>Left</button>
      <div className="carousselContainer">
        {randomFilms.length && (
          <>
            <img
              src={randomFilms[0].fields.previewImage}
              alt=""
              className={pic1}
            />
            <img
              src={randomFilms[1].fields.previewImage}
              alt=""
              className={pic2}
            />
            <img
              src={randomFilms[2].fields.previewImage}
              alt=""
              className={pic3}
            />
          </>
        )}
      </div>
      <button onClick={() => nextPicture()}>Right</button>
    </div>
  );
}

export default Caroussel;
