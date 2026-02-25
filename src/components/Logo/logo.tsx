import React from "react";
import logo from "/img/general/icons/Logo.svg";
import styles from "./Logo.module.scss";

export const Logo: React.FC = () => {
  return (
    <a href="https://github.com/Radymyr" className={styles.logo}>
      <img src={logo} alt="logo" />
    </a>
  );
};
