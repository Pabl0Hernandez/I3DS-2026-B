import React from "react"
import styles from "./Switch.module.css";

const Switch = ({ troca, isLight }) => {
  return (
    <div>
      <div onClick={troca} className={styles.Switch}>
        <button></button>
        <span></span>
      </div>
    </div>
  );
};

export default Switch
