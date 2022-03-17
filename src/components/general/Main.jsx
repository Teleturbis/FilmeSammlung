import React from "react";
import News from "../News";
import Caroussel from "../Caroussel";
import InTheaters from "../InTheaters";

function Main({ randomFilms, client }) {
  return (
    <div className="mainContainer">
      <News />
      <Caroussel randomFilms={randomFilms} />
      <InTheaters client={client} />
    </div>
  );
}

export default Main;
