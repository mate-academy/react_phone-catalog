import React, { useContext } from "react";
import styles from "./Logo.module.scss";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";
import { getAssetPath } from "../../utils";
import { Link } from "react-router-dom";
import { routes } from "../../Root";

export const Logo: React.FC = () => {
  const { theme } = useContext(AppSettingsContext);

  return (
    <Link to={routes.home} className={styles.logo}>
      <img
        className={theme === "light" ? styles.logoImageLight : styles.logoImage}
        src={getAssetPath("img/general/icons/Logo.svg")}
        alt="logo"
      />
    </Link>
  );
};
