import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as Contentful from 'contentful';
import Header from './components/general/Header.jsx';
import Footer from './components/general/Footer.jsx';
import './assets/style.css';
import Caroussel from './components/Caroussel.jsx';
import Genres from './components/Genres.jsx';

function App() {
  const [films, setFilms] = useState(false);
  const [randomFilms, setRandomFilms] = useState([]);

  const client = Contentful.createClient({
    space: '5o4kejg5nlut',
    accessToken: 'IPErBwAcWvsPYzYEBdLbsMibGKstWOFf7yPBwZHWMSo',
    host: 'cdn.contentful.com',
  });

  /* useEffect(async () => {
    let fetching = await client.getEntries();
    setFilms(fetching.items);
  }, []); */

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let fetching = await client.getEntries({ content_type: 'filmItem2' });
    setFilms(fetching.items);
  }

  useEffect(() => {
    if (films) {
      let randomNumber = Math.floor(Math.random() * films.length);
      let tempArr = [];
      if (randomNumber == 0) {
        for (let i = 0; i < 3; i++) {
          tempArr.push(films[randomNumber + i]);
        }
      } else if (randomNumber == films.length) {
        for (let i = 0; i < 3; i++) {
          tempArr.push(films[randomNumber - i]);
        }
      } else {
        tempArr.push(films[randomNumber]);
        tempArr.push(films[randomNumber + 1]);
        tempArr.push(films[randomNumber - 1]);
      }

      setRandomFilms(tempArr);
    }
  }, [films]);

  return (
    <div>
      <Header />
      <div>{films && console.log(films)}</div>
      <Routes>
        <Route
          path="/genre"
          element={<Genres client={client} films={films} />}
        />
        <Route path="/" element={<Caroussel randomFilms={randomFilms} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
