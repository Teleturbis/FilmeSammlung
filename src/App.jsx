import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as Contentful from 'contentful';
import './assets/style.css';

import Header from './components/general/Header.jsx';
import Footer from './components/general/Footer.jsx';
import Main from './components/general/Main.jsx';

import Genres from './components/genres/Genres.jsx';
import FilmDetail from './components/details/FilmDetail.jsx';

import LogIn from './components/login/LogIn.jsx';
import User from './components/login/User.jsx';

import Hot from './components/Hot';

import SearchActor from './components/search/SearchActor.jsx';
import SearchDirector from './components/search/SearchDirector.jsx';
import SearchCompany from './components/search/SearchCompany.jsx';
import SearchGenre from './components/search/SearchGenre.jsx';
import Search from './components/search/Search.jsx';

function App() {
  const [films, setFilms] = useState(false);
  const [randomFilms, setRandomFilms] = useState([]);
  const [user, setUser] = useState({ loggedIn: false, userName: '', id: '' });

  const client = Contentful.createClient({
    space: '5o4kejg5nlut',
    accessToken: 'IPErBwAcWvsPYzYEBdLbsMibGKstWOFf7yPBwZHWMSo',
    host: 'cdn.contentful.com',
  });

  function userLoggedIn(userName, uuid) {
    setUser({ loggedIn: !user.loggedIn, userName: userName, id: uuid });
  }

  useEffect(() => {
    fetchData();
    if (localStorage.getItem('loggedIn') === 'true') {
      setUser({
        loggedIn: localStorage.getItem('loggedIn'),
        userName: localStorage.getItem('userName'),
        id: localStorage.getItem('id'),
      });
    } else {
      setUser({ loggedIn: false, userName: '', id: '' });
    }
  }, []);

  function fetchData() {
    // let fetching = await client.getEntries({ content_type: "filmItem3" });
    fetch('https://filmesammlung-backend.herokuapp.com/filmitems')
      .then((res) => res.json())
      .then((json) => setFilms(json));

    // setFilms(fetching.items);
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
      <Header user={user} userLoggedIn={userLoggedIn} />
      {/* <div>{films && console.log(films)}</div> */}
      <Routes>
        <Route path="hot" element={<Hot films={films} />}></Route>
        <Route path="/user">
          <Route index element={<User client={client} user={user} />}></Route>
          <Route
            path="/user/login"
            element={
              <LogIn client={client} userLoggedIn={userLoggedIn} user={user} />
            }
          ></Route>
        </Route>

        <Route path="/search">
          <Route index element={<Search films={films} />}></Route>
          <Route
            path="/search/actors/:searchName"
            element={<SearchActor films={films} />}
          />
          <Route
            path="/search/director/:searchName"
            element={<SearchDirector films={films} />}
          />
          <Route
            path="/search/company/:searchName"
            element={<SearchCompany films={films} />}
          />
          <Route
            path="/search/genre/:searchName"
            element={<SearchGenre films={films} />}
          />
        </Route>

        <Route
          path="/genre"
          element={<Genres client={client} films={films} />}
        />
        <Route
          path="/"
          element={<Main randomFilms={randomFilms} client={client} />}
        />

        <Route
          path="/film/:filmid"
          element={<FilmDetail films={films} user={user} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
