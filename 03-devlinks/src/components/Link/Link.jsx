import React from "react";
import style from "./link.module.css";

const Link = ({ url, children}) => {
  return (
    <li>
        <a href={url}>{children}</a>
    </li>
  );
};

export default Link;
