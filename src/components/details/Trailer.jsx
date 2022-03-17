import React, { useEffect, useState } from "react";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

export default function Trailer({ filmName }) {
  const [url, setUrl] = useState(false);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);

  useEffect(() => {
    movieTrailer(filmName, { id: true }).then((response) => setUrl(response));
    setWidth(window.innerWidth - 17);
    setHeight((window.innerWidth / 164) * 80);
  }, []);

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.mute();
    event.target.playVideo();
  }

  const opts = {
    //VERHÄLTNISS H:B = 1:1.64
    height: `${height}`,
    width: `${width}`,
    playerVars: {
      autoplay: 1,
      controls: 1,
      loop: 1,
    },
  };

  return (
    <div style={{marginTop: "1rem", width: "100%", display: "flex", justifyContent: "center", height: `${height}px` }}>
      {url ? <YouTube videoId={url} opts={opts} onReady={_onReady} /> : null}
    </div>
  );
}
