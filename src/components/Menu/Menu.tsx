import React, { useContext } from "react";
import { HeaderIconButton } from "../HeaderButtons";
import { getCount } from "../../utils";
import { StateContext } from "../../providers/GlobalStateProvider";
import styles from "./Menu.module.scss";
import { HeaderMenu } from "../HeaderMenu";
import { Link } from "react-router-dom";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";
import { getAssetPath } from "../../utils";

interface Props {
  onClose: () => void;
}

export const Menu: React.FC<Props> = ({ onClose }) => {
  const { favoriteIds, cartIds } = useContext(StateContext);
  const { theme, language, toggleTheme, toggleLanguage, labels } =
    useContext(AppSettingsContext);

  return (
    <div className={styles.menu}>
      <header className={styles.header}>
        <Link className={styles.logo} to="/" onClick={onClose}>
          <img
            className={`${styles.logoImage} ${theme === "light" ? styles.logoImageLight : ""}`}
            alt="logo"
            src={getAssetPath("img/general/icons/Logo.svg")}
          />
        </Link>
        <button className={styles.button} onClick={onClose} type="button">
          <img
            className={`${styles.closeIcon} ${theme === "light" ? styles.closeIconLight : ""}`}
            alt="close"
            src={getAssetPath("img/general/icons/close.svg")}
          />
        </button>
      </header>

      <div className={styles.content}>
        <div className={styles.controls}>
          <button
            className={styles.controlButton}
            type="button"
            onClick={toggleTheme}
          >
            {labels.theme}: {theme}
          </button>
          <button
            className={styles.controlButton}
            type="button"
            onClick={toggleLanguage}
          >
            {labels.language}: {language.toUpperCase()}
          </button>
        </div>
        <HeaderMenu mobile onNavigate={onClose} />
      </div>

      <div className={styles.buttons}>
        <HeaderIconButton
          icon="heart"
          buttonClassName={styles.iconButton}
          buttonStyles={{ display: "flex" }}
          onClick={onClose}
          count={getCount(favoriteIds)}
        />
        <HeaderIconButton
          icon="cart"
          buttonClassName={styles.iconButton}
          buttonStyles={{ display: "flex" }}
          onClick={onClose}
          count={getCount(cartIds)}
        />
      </div>
    </div>
  );
};
