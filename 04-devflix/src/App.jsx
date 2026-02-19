import "./App.css";

import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";

const App = () => {
  return (
    <div id="App">
      <img
        id="logo"
        src={logo}
        alt="Logo do serviço de streaming DEVFLIX em destaque com cores vermelha e preta, representando uma plataforma de streaming de filmes e séries."
      />

      <div className="search">
        <input type="text" placeholder="Pesquise por Filmes e Series..." />

        <img src={lupa} alt="Botão de ação para pesquisa!" />
      </div>
      
      <Rodape>Pablo Hernandez シ</Rodape>
    </div>
  );
};

export default App;
