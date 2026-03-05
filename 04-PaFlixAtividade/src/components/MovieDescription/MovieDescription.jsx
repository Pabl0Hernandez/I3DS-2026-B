import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState({});
  const [plotPT, setPlotPT] = useState("");

  useEffect(() => {
    fetch(`${props.apiUrl}&i=${props.movieID}`)
      .then((response) => response.json())
      .then(async (data) => {
        setMovieDesc(data);

        // traduzindo a sinopse para PT-BR
        const res = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(data.Plot)}`
        );

        const translated = await res.json();
        setPlotPT(translated[0][0][0]);
      })
      .catch((error) => console.error(error));
  }, [props.movieID]);

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt="" />

          <button className={styles.btnClose} onClick={props.click}>
            X
          </button>

          <div className={styles.movieType}>
            <div>
              <img src="/PH.png" alt="" />
              {movieDesc.Type}
              <h1>{movieDesc.Title}</h1>

              <a
                href={`https://google.com/search?q=${encodeURIComponent(movieDesc.Title + " filme")}`}
                target="_blank"
                rel="noreferrer"
              >
                ▶️ Assistir
              </a>
            </div>
          </div>
        </div>

        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            Avaliação: {movieDesc.imdbRating} | Duração: {movieDesc.Runtime} | {movieDesc.Released}
          </div>

          <div className={styles.containerFlex}>
            <p>Elenco: {movieDesc.Actors}</p>
            <p>Gênero: {movieDesc.Genre}</p>
          </div>
        </div>

        <div className={styles.desc}>
          <p>Sinopse: {plotPT}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;