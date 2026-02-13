import "./App.css";
import Link from "./components/Link/Link";
import Perfil from "./components/Perfil/Perfil";
import SocialLink from "./components/SocialLink/SocialLink";
import Rodape from "./components/Rodape/Rodape";


function App() {
  return (
    <div id="App">
    <Perfil fotoPerfil={"https://placehold.co/100"}> Pablo Hernandez シ </Perfil>
    <div className="switch">Botão Swhitch</div> 

      <div id="Link">
      <ul>
        <Link url={""}>Increva-se</Link>
        <Link url={""}>Minha Playlist</Link>
        <Link url={""}>Me pague um café!</Link>
        <Link url={""}>Conheça o Curso DEV</Link>
      </ul>
</div>

      <div id="SocialLinks">
      <SocialLink url={"https://github.com"} icon={"logo-github"} /> 
      <SocialLink url={"https://instagram.com"} icon={"logo-instagram"} /> 
      <SocialLink url={"https://youtube.com"} icon={"logo-youtube"} /> 
      <SocialLink url={"https://linkd.in"} icon={"logo-linkedin"} /> 
      </div>
      <Rodape>PabloH</Rodape>
      </div>
  )
}
export default App  
