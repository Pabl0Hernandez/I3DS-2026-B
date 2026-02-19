import "./App.css";
import { useEffect, useState } from "react";
import Rodape from "./assets/components/Rodape/Rodape";
import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";

const App = () => {
  const [movies, setMovies] = useState([]);

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://ombdapi.com/?apikey=${apiKey}`;

  // Criando a conexão com API e trazendo informações
  const searchMovies = async (title) => {
    const respone = await fetch(`${apiUrl}&s=${title}`);
    const data = await respone.json;

    // Alimentando a variavel movis
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div id="App">
      <img
        id="Logo"
        src={logo}
        alt="Logo do serviço de streaming DEVFLIX em destaque com cores vermelha e preta, representando uma plataforma de streaming de filmes e séries."
      />

      <div className="search">
        <input type="text" placeholder="Pesquise por Filmes e Series..." />

        <img src={lupa} alt="Botão de ação para pesquisa!" />
      </div>

<div className="container">
  {movies.map((movies, index) => }
</div>





      <Rodape link={"https://github.com/Pabl0Hernandez"}>
        PabloHernandez シ{" "}
      </Rodape>
    </div>
  );
};

export default App;
