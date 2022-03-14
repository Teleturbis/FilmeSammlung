import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Trailer from './Trailer.jsx';

export default function FilmDetails({ films }) {
  const [filmDetails, setFilmDetails] = useState(false);

  let { filmid } = useParams();

  useEffect(() => {
    if (films) {
      setFilmDetails(films.find((el) => el.sys.id === filmid));
    }
  }, [films]);

  console.log('FILMDETAILS', filmDetails);

  return (
    <div>
      {filmDetails && (
        <div>
          <div>
            <Trailer filmName={filmDetails.fields.title} />
            <div>
              <img src={filmDetails.fields.previewImage} alt="" />
              <div>
                <h2>{filmDetails.fields.title}</h2>
                <p>{filmDetails.fields.description}</p>
              </div>
            </div>
          </div>
          <div>
            <ul style={{ display: 'flex' }}>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Genre:</h3>
                </li>
                {filmDetails.fields.genres.map((el, index) => (
                  <li key={index}>{el}</li>
                ))}
              </ul>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Schauspieler:</h3>
                </li>
                {filmDetails.fields.actors.map((el, index) => (
                  <li key={index}>{el}</li>
                ))}
              </ul>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Company:</h3>
                </li>
                <li>{filmDetails.fields.company}</li>
              </ul>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Veröffentlicht:</h3>
                </li>
                <li>{filmDetails.fields.date}</li>
              </ul>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Director:</h3>
                </li>
                <li>{filmDetails.fields.director}</li>
              </ul>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Länge:</h3>
                </li>
                <li>{filmDetails.fields.lengthInMin} min</li>
              </ul>
              <ul>
                <li>
                  <h3 style={{ margin: 0 }}>Likes:</h3>
                </li>
                <li>{filmDetails.fields.voting}</li>
              </ul>
            </ul>
          </div>
          <div>
            {filmDetails.fields.comments.map((el, index) => {
              return (
                <div key={index} style={{ marginTop: '5rem' }}>
                  <div style={{ display: 'flex', margin: '0' }}>
                    <p style={{ fontSize: '2rem', margin: '0 2rem' }}>
                      {el.author}
                    </p>
                    <p style={{ fontSize: '2rem', margin: '0 2rem' }}>
                      {el.created_at}
                    </p>
                  </div>
                  <p style={{ margin: '1rem 0' }}>{el.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
