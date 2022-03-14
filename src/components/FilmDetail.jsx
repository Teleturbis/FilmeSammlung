import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Trailer from "./Trailer.jsx";
import "../assets/filmItemsStyle.css";

export default function FilmDetails({ films }) {
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
              <img src={filmDetails.fields.previewImage} alt="Film Image" />
              <div>
                <h2>{filmDetails.fields.title}</h2>
                <p>{filmDetails.fields.description}</p>
              </div>
            </div>
          </div>
          <div>
            <ul style={{ display: "flex" }}>
              <ul className="ulFilmDetailsGenres">
                <li>
                  <h3 style={{ margin: 0 }}>Genre:</h3>
                </li>
                {filmDetails.fields.genres.map((el, index) => (
                  <p className="ulFilmDetailsParagraph" key={index}>
                    {el}
                  </p>
                ))}
              </ul>
              <ul className="ulFilmDetailsActors">
                <li>
                  <h3 style={{ margin: 0 }}>Schauspieler:</h3>
                </li>
                {filmDetails.fields.actors.map((el, index) => (
                  <p className="ulFilmDetailsParagraph" key={index}>
                    {el}
                  </p>
                ))}
              </ul>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Company:</h3>
                </li>
                <p className="ulFilmDetailsParagraph">
                  {filmDetails.fields.company}
                </p>
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
                <p className="ulFilmDetailsParagraph">
                  {filmDetails.fields.director}
                </p>
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
            <div className="userAddComment">
              <textarea
                cols="30"
                rows="10"
                style={{ resize: "none" }}
                placeholder="Neuen Kommentar schreiben"
              ></textarea>
              <input type="button" value="Posten" />
            </div>
            {filmDetails.fields.comments.map((comment, index) => {
              return (
                <div key={index} className="commentDiv">
                  <div className="commentHeader">
                    <p className="commentAuthor">{comment.author}</p>
                    <p className="commentDate">{comment.created_at}</p>
                  </div>
                  <p className="commentBody">
                    {comment.content.split("\n").map((str, index) => <p key={index} className="comment-paragraph">{str}</p>)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
