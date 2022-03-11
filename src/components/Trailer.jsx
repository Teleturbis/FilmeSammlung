import React, { useEffect, useState } from 'react';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

export default function Trailer({ filmName }) {
  const [url, setUrl] = useState(false);

  useEffect(
    () =>
      movieTrailer(filmName, { id: true }).then((response) => setUrl(response)),
    []
  );

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts = {
    //VERHÄLTNISS H:B = 1:1.64
    height: '250',
    width: '410',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      {url ? <YouTube videoId={url} opts={opts} onReady={_onReady} /> : null}
    </div>
  );
}
