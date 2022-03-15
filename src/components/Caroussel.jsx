import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from 'react-icons/md';

function Caroussel({ randomFilms }) {
  // console.log(randomFilms[0].fields.title);
  // console.log(randomFilms[0].fields.previewImage.fields.file.url);

  let [indexNumber, setIndexNumber] = useState(0);

  const [pic1, setPic1] = useState();
  const [pic2, setPic2] = useState();
  const [pic3, setPic3] = useState();

  console.log(indexNumber, 'indexNumber');
  console.log(randomFilms, 'randomFilms');

  const nextPicture = () => {
    if (indexNumber === 2) {
      setIndexNumber(0);
      cssClassRight();
    } else {
      setIndexNumber(indexNumber + 1);
      cssClassRight();
    }
  };

  const previousPicture = () => {
    if (indexNumber === 0) {
      setIndexNumber(2);
      cssClassLeft();
    } else {
      setIndexNumber(indexNumber - 1);
      cssClassLeft();
    }
  };

  function cssClassRight() {
    if (indexNumber === 2) {
      setPic1('fadeinright-animation carousselPicture');
      setPic2('hidden');
      setPic3('fadeoutright-animation carousselPicture');
    } else if (indexNumber === 0) {
      setPic1('fadeoutright-animation carousselPicture');
      setPic2('fadeinright-animation carousselPicture');
      setPic3('hidden');
    } else {
      setPic1('hidden');
      setPic2('fadeoutright-animation carousselPicture');
      setPic3('fadeinright-animation carousselPicture');
    }
  }

  function cssClassLeft() {
    if (indexNumber === 0) {
      setPic1('fadeinleft-animation carousselPicture');
      setPic2('hidden');
      setPic3('fadeoutleft-animation carousselPicture');
    } else if (indexNumber === 1) {
      setPic1('fadeoutleft-animation carousselPicture');
      setPic2('fadeinleft-animation carousselPicture');
      setPic3('hidden');
    } else {
      setPic1('hidden');
      setPic2('fadeoutleft-animation carousselPicture');
      setPic3('fadeinleft-animation carousselPicture');
    }
  }

  return (
    <div className="carousselContainer">
      <h3 className="carousselTitle">Filme des Tages</h3>
      <div className="carousselFrame">
        <button className="carousselButton" onClick={() => previousPicture()}>
          <MdOutlineKeyboardArrowLeft />
        </button>
        <div className="caroussel">
          {randomFilms.length && (
            <>
              <NavLink to={`/films/${randomFilms[0].sys.id}`}>
                <img
                  src={randomFilms[0].fields.previewImage}
                  alt=""
                  className={`${pic1} carousselPicture`}
                />
              </NavLink>
              <NavLink to={`/films/${randomFilms[0].sys.id}`}>
                <img
                  src={randomFilms[1].fields.previewImage}
                  alt=""
                  className={pic2}
                />
              </NavLink>
              <NavLink to={`/films/${randomFilms[0].sys.id}`}>
                <img
                  src={randomFilms[2].fields.previewImage}
                  alt=""
                  className={pic3}
                />
              </NavLink>
            </>
          )}
        </div>
        <button className="carousselButton" onClick={() => nextPicture()}>
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Caroussel;
