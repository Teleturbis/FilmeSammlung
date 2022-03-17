import React from "react";
import News from "../News";
import Caroussel from "../Caroussel";
import InTheaters from "../InTheaters";

function Main({ randomFilms, client }) {
  return (
    <div
      className="mainContainer"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Caroussel randomFilms={randomFilms} />
      <div>
        <InTheaters client={client} />
      </div>
    </div>
  );
}

export default Main;
