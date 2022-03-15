import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Contentful from "contentful";
import Header from "./components/general/Header.jsx";
import Footer from "./components/general/Footer.jsx";
import "./assets/style.css";
import Caroussel from "./components/Caroussel.jsx";
import Genres from "./components/Genres.jsx";
import FilmDetail from "./components/FilmDetail.jsx";
import LogIn from "./components/LogIn.jsx";

function App() {
  const [films, setFilms] = useState(false);
  const [randomFilms, setRandomFilms] = useState([]);
  const [user, setUser] = useState({ loggedIn: false, userName: "", id: "" });
  const [localStorageUser, setLocalStorageUser] = useState({
    loggedIn: false,
    userName: "",
    id: "",
  });

  const client = Contentful.createClient({
    space: "5o4kejg5nlut",
    accessToken: "IPErBwAcWvsPYzYEBdLbsMibGKstWOFf7yPBwZHWMSo",
    host: "cdn.contentful.com",
  });

  function userLoggedIn(userName, uuid) {
    setUser({ loggedIn: !user.loggedIn, userName: userName, id: uuid });
  }

  useEffect(() => {
    fetchData();
    if (localStorage.getItem("loggedIn") === "true") {
      setUser({
        loggedIn: localStorage.getItem("loggedIn"),
        userName: localStorage.getItem("userName"),
        id: localStorage.getItem("id"),
      });
    } else {
      setUser({ loggedIn: false, userName: "", id: "" })
    }
  }, []);

  async function fetchData() {
    let fetching = await client.getEntries({ content_type: "filmItem3" });
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
      <Header user={user} userLoggedIn={userLoggedIn} />
      <div>{films && console.log(films)}</div>
      <Routes>
        <Route path="/login">
          <Route
            index
            element={
              <LogIn client={client} userLoggedIn={userLoggedIn} user={user} />
            }
          ></Route>
        </Route>
        <Route
          path="/genre"
          element={<Genres client={client} films={films} />}
        />
        <Route path="/" element={<Caroussel randomFilms={randomFilms} />} />
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
