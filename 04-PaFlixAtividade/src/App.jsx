import { useEffect, useState } from "react";
import "./App.css";

import logo from "./assets/PHFLIX.png";
import lupa from "./assets/search.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  // CONTROLE DO IDIOMA
  const [language, setLanguage] = useState(localStorage.getItem("language") || "pt");

  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "en" : "pt");
  };

  useEffect(() => {
  localStorage.setItem("language", language);
}, [language]);

  // CONTROLE DO TEMA
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"),
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // API
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  // BUSCAR FILMES
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  // BUSCA INICIAL
  useEffect(() => {
    (async () => {
      await searchMovies("");
    })();
  }, []);

  return (
    <div id="App">
      {/* BOTÃO DE IDIOMA */}
      <button className="langToggle" onClick={toggleLanguage}>
        {language === "pt" ? "🇺🇸 EN" : "🇧🇷 PT"}
      </button>

      {/* BOTÃO DE TEMA */}
      <button className="themeToggle" onClick={toggleTheme}>
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>

      <img
        id="Logo"
        src={logo}
        alt="Logotipo do serviço de streaming Devflix, com letras vermelhas e fundo preto."
      />

      <div className="search">
        <input
          onKeyDown={(e) => e.key === "Enter" && searchMovies(search)}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder={
            language === "pt"
              ? "Pesquise por filmes e séries!"
              : "Search for movies and series!"
          }
        />

        <img
          onClick={() => searchMovies(search)}
          src={lupa}
          alt="Search button"
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} {...movie} apiUrl={apiUrl} />
          ))}
        </div>
      ) : (
        <h2 className="empty">
          {language === "pt"
            ? "😢 Filme não encontrado pamonha! 🤣"
            : "😢 Movie not found!"}
        </h2>
      )}

      <Rodape link={"https://github.com/Pabl0Hernandez"}>
        Pablo Hernandez ツ
      </Rodape>
    </div>
  );
};

export default App;
