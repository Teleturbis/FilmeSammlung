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
      setFilmDetails(films.find((el) => el.filmid === filmid));
    }
  }, [films]);

  return (
    <div>
      {filmDetails && (
        <div className="filmDetails">
          <div className="trailerDiv">
            <Trailer className="trailer" filmName={filmDetails.title} />
            <div className="filmitemHeaderDiv">
              <div>
                <h2>{filmDetails.title}</h2>
                <p>{filmDetails.description}</p>
              </div>
              <img
                className="filmImg"
                src={filmDetails.preview}
                alt="Film Image"
              />
            </div>
          </div>
          <div className="listDiv">
            <ul className="filmDetailsList">
              {/* <ul className="ulFilmDetailsGenres">
                <li>
                  <h3 style={{ margin: 0 }}>Genre:</h3>
                </li>
                <div>
                  {filmDetails.fields.genres.map((el, index) => (
                    <NavLink
                      to={`/search/genre/${el}`}
                      className="ulFilmDetailsParagraph"
                      key={index}
                    >
                      {el}
                    </NavLink>
                  ))}
                </div>
              </ul>
              <ul className="ulFilmDetailsActors">
                <li>
                  <h3 style={{ margin: 0 }}>Schauspieler:</h3>
                </li>
                {filmDetails.fields.actors.length > 10 ? (
                  <Actors actors={filmDetails.fields.actors} />
                ) : (
                  <div>
                    {filmDetails.fields.actors.map((el, index) => (
                      <NavLink
                        to={`/search/actors/${el}`}
                        className="ulFilmDetailsParagraph"
                        key={index}
                      >
                        {el}
                      </NavLink>
                    ))}
                  </div>
                )}
              </ul>
              <ul className="ulFilmDetailsCompany">
                <li>
                  <h3 style={{ margin: 0 }}>Company:</h3>
                </li>
                <div>
                  <NavLink
                    to={`/search/company/${filmDetails.fields.company}`}
                    className="ulFilmDetailsParagraph"
                  >
                    {filmDetails.fields.company}
                  </NavLink>
                </div>
              </ul> */}
              <ul className="ulFilmDetailsPublished">
                <li>
                  <h3 style={{ margin: 0 }}>Ver??ffentlicht:</h3>
                </li>
                <div>
                  <p className="ulFilmDetailsParagraphNoHover">
                    {filmDetails.date}
                  </p>
                </div>
              </ul>
              {/* <ul className="ulFilmDetailsDirector">
                <li>
                  <h3 style={{ margin: 0 }}>Director:</h3>
                </li>
                <div>
                  <NavLink
                    to={`/search/director/${filmDetails.fields.director}`}
                    className="ulFilmDetailsParagraph"
                  >
                    {filmDetails.fields.director}
                  </NavLink>
                </div>
              </ul> */}
              <ul className="ulFilmDetailsLength">
                <li>
                  <h3 style={{ margin: 0 }}>L??nge:</h3>
                </li>
                <div>
                  <p className="ulFilmDetailsParagraphNoHover">
                    {filmDetails.length} min
                  </p>
                </div>
              </ul>
              <ul className="ulFilmDetailsLikes">
                <li>
                  <h3 style={{ margin: 0 }}>Likes:</h3>
                </li>
                <div>
                  <p className="ulFilmDetailsParagraphNoHover">
                    {filmDetails.voting}
                  </p>
                </div>
              </ul>
            </ul>
          </div>
          {/* <div>
            <AddComment
              entryId={filmDetails.sys.id}
              user={user}
              comments={filmDetails.fields.comments}
            />
          </div> */}
        </div>
      )}
    </div>
  );
}
