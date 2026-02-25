import React, { useContext } from "react";
import logo from "/img/general/icons/Logo.svg";
import styles from "./Logo.module.scss";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";

export const Logo: React.FC = () => {
  const { theme } = useContext(AppSettingsContext);

  return (
    <a href="https://github.com/Radymyr" className={styles.logo}>
      <img
        className={theme === "light" ? styles.logoImageLight : styles.logoImage}
        src={logo}
        alt="logo"
      />
    </a>
  );
};
