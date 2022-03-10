import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

export default function GenreLi({ genre, sortedFilms, indexGenres }) {
  console.log('LI', sortedFilms);

  if (sortedFilms.length === 0) return <></>;

  return (
    <div
      style={{
        border: '1px solid rgb(200,200,200)',
        margin: '3rem 5rem',
        padding: '2rem 0',
        borderRadius: '0.5rem',
      }}
    >
      <h3
        style={{
          textAlign: 'center',
          fontSize: '5rem',
        }}
      >
        {genre}
      </h3>
      <div style={{ display: 'flex', overflow: 'auto' }}>
        {sortedFilms.map((film, index) => (
          <NavLink
            style={{ backgroundImage: `url(${film.fields.previewImage})` }}
            className="cardGenre"
            to={`/films/${film.sys.id}`}
            key={index}
          >
            <h4
              style={{
                marginTop: '75%',
                background:
                  'radial-gradient(rgba(0,0,0,0.85) 45%, transparent 75% )',
                padding: '3rem 4rem',
                textAlign: 'center',
                color: 'gray',
              }}
            >
              {film.fields.title}
            </h4>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
