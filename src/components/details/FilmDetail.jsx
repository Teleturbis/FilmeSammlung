import React, { useState, useEffect } from "react";
import Trailer from "./Trailer.jsx";
import "../../assets/filmItemsStyle.css";
import AddComment from "./AddComment.jsx";
import Actors from "../search/Actors.jsx";
import { NavLink, useParams } from "react-router-dom";

export default function FilmDetails({ films, user }) {
  const [filmDetails, setFilmDetails] = useState(false);

  let { filmid } = useParams();

  useEffect(() => {
    if (films) {
      setFilmDetails(films.find((el) => el.sys.id === filmid));
    }
  }, [films]);

  console.log("FILMDETAILS", filmDetails);

  return (
    <div>
      {filmDetails && (
        <div className="filmDetails">
          <div>
            <Trailer
              className="trailerDiv"
              filmName={filmDetails.fields.title}
            />
            <div className="filmitemHeaderDiv">
              <div>
                <h2>{filmDetails.fields.title}</h2>
                <p>{filmDetails.fields.description}</p>
              </div>
              <img src={filmDetails.fields.previewImage} alt="Film Image" />
            </div>
          </div>
          <div>
            <ul style={{ display: "flex" }}>
              <ul className="ulFilmDetailsGenres">
                <li>
                  <h3 style={{ margin: 0 }}>Genre:</h3>
                </li>
                {filmDetails.fields.genres.map((el, index) => (
                  <NavLink
                  to={`/search/genre/${el}`} className="ulFilmDetailsParagraph" key={index}>
                    {el}
                  </NavLink>
                ))}
              </ul>
              <ul className="ulFilmDetailsActors">
                <li>
                  <h3 style={{ margin: 0 }}>Schauspieler:</h3>
                </li>
                {filmDetails.fields.actors.length > 10 ? (
                  <Actors actors={filmDetails.fields.actors} />
                ) : (
                  filmDetails.fields.actors.map((el, index) => (
                    <NavLink
                      to={`/search/actors/${el}`}
                      className="ulFilmDetailsParagraph"
                      key={index}
                    >
                      {el}
                    </NavLink>
                  ))
                )}
              </ul>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Company:</h3>
                </li>
                <NavLink
                      to={`/search/company/${filmDetails.fields.company}`} className="ulFilmDetailsParagraph">
                  {filmDetails.fields.company}
                </NavLink>
              </ul>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Veröffentlicht:</h3>
                </li>
                <p className="ulFilmDetailsParagraphNoHover">
                  {filmDetails.fields.date}
                </p>
              </ul>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Director:</h3>
                </li>
                <NavLink
                      to={`/search/director/${filmDetails.fields.director}`} className="ulFilmDetailsParagraph">
                  {filmDetails.fields.director}
                </NavLink>
              </ul>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Länge:</h3>
                </li>
                <p className="ulFilmDetailsParagraphNoHover">
                  {filmDetails.fields.lengthInMin} min
                </p>
              </ul>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Likes:</h3>
                </li>
                <p className="ulFilmDetailsParagraphNoHover">
                  {filmDetails.fields.voting}
                </p>
              </ul>
            </ul>
          </div>
          <div>
            <AddComment
              entryId={filmDetails.sys.id}
              user={user}
              comments={filmDetails.fields.comments}
            />
          </div>
        </div>
      )}
    </div>
  );
}
