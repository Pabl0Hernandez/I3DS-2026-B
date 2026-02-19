import React from "react";
import "./Rodape.module.css";

const Rodape = ({ children, link }) => {
  return (
    <footer>
      <p>
        Feito com 🤍 por <a href={link} target="_black">{children}</a>
      </p>
    </footer>
  );
};

export default Rodape;
