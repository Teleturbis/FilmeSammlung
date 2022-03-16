import React, { useState, useEffect } from "react";
import GenreLi from "./GenreLi.jsx";
import "../../assets/genreStyle.css";

export default function Genres({ films, client }) {
  const [sortedFilms, setSortedFilms] = useState(false);
  const [genresArr, setGenresArr] = useState(false);
  const [genres, setGenres] = useState(false);

  useEffect(async () => {
    let fetching = await client.getEntries({ content_type: "genres" });
    setGenresArr(fetching.items);
  }, []);

  useEffect(() => {
    if (genresArr) {
      let tempArr = genresArr.map((el) => el.fields.genres);
      setGenres(tempArr[0]);
    }
  }, [genresArr]);

  useEffect(() => {
    if (films) {
      let arr = [];
      for (let i = 0; i < genres.length; i++) {
        arr[i] = films.filter((el) => el.fields.genres[0] === genres[i]);
      }
      setSortedFilms(arr);
    }
  }, [films, genres]);

  return (
    <div>
      {genres &&
        sortedFilms.length > 0 &&
        genres.map((genre, index) => (
          <GenreLi
            key={index}
            index={index}
            sortedFilms={sortedFilms[index]}
            genre={genre}
          />
        ))}
    </div>
  );
}

/*
genre = ["action", "scifi"]
*/
