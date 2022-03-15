import React from 'react';
import News from '../News';
import Caroussel from '../Caroussel';

function Main({ randomFilms }) {
  return (
    <div className="mainContainer">
      <News />
      <Caroussel randomFilms={randomFilms} />
    </div>
  );
}

export default Main;
