import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState({});
  const [plotPT, setPlotPT] = useState("");
  const [language, setLanguage] = useState("pt");

  useEffect(() => {
    fetch(`${props.apiUrl}&i=${props.movieID}`)
      .then((response) => response.json())
      .then(async (data) => {
        setMovieDesc(data);

        const res = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(
            data.Plot
          )}`
        );

        const translated = await res.json();
        setPlotPT(translated[0][0][0]);
      })
      .catch((error) => console.error(error));
  }, [props.movieID]);

  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "en" : "pt");
  };

  const traduzirTipo = (tipo) => {
    if (language === "en") return tipo;

    if (tipo === "movie") return "Filme";
    if (tipo === "series") return "Série";
    if (tipo === "episode") return "Episódio";

    return tipo;
  };

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>

        {/* BOTÃO DE IDIOMA */}
        <button className={styles.langBtn} onClick={toggleLanguage}>
          {language === "pt" ? "🇺🇸 English" : "🇧🇷 Português"}
        </button>

        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt="" />

          <button className={styles.btnClose} onClick={props.click}>
            X
          </button>

          <div className={styles.movieType}>
            <div>
              <img src="/PH.png" alt="" />

              <p>{traduzirTipo(movieDesc.Type)}</p>

              <h1>{movieDesc.Title}</h1>

              <a
                href={`https://google.com/search?q=${encodeURIComponent(
                  movieDesc.Title + " filme"
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                ▶️ {language === "pt" ? "Assistir" : "Watch"}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            {language === "pt" ? "Avaliação" : "Rating"}: {movieDesc.imdbRating} |
            {language === "pt" ? "Duração" : "Runtime"}: {movieDesc.Runtime} |
            {movieDesc.Released}
          </div>

          <div className={styles.containerFlex}>
            <p>
              {language === "pt" ? "Elenco" : "Actors"}: {movieDesc.Actors}
            </p>

            <p>
              {language === "pt" ? "Gênero" : "Genre"}: {movieDesc.Genre}
            </p>
          </div>
        </div>

        <div className={styles.desc}>
          <p>
            {language === "pt" ? "Sinopse" : "Plot"}:{" "}
            {language === "pt" ? plotPT : movieDesc.Plot}
          </p>
        </div>

      </div>
    </div>
  );
};

export default MovieDescription;