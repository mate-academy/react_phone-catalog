import React, { useContext, useEffect, useState } from "react";
import { HeaderIconButton } from "../HeaderButtons";
import styles from "./Header.module.scss";
import { Logo } from "../Logo";
import { StateContext } from "../../providers/GlobalStateProvider";
import { getCount } from "../../utils";
import { HeaderMenu } from "../HeaderMenu";
import { Menu } from "../Menu";
import { HeaderSearch } from "../HeaderSearch";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";
import { getAssetPath } from "../../utils";

export const Header: React.FC = () => {
  const { favoriteIds, cartIds } = useContext(StateContext);
  const { theme, language, toggleTheme, toggleLanguage, labels } =
    useContext(AppSettingsContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.row}>
          <div className={styles.headerContent}>
            <Logo />
            <HeaderMenu />
            <div className={styles.desktopSearch}>
              <HeaderSearch />
            </div>
          </div>
          <div className={styles.buttons}>
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
            <HeaderIconButton icon="heart" count={getCount(favoriteIds)} />
            <HeaderIconButton icon="cart" count={getCount(cartIds)} />
            <button
              className={styles.button}
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <img
                className={`${styles.icon} ${theme === "light" ? styles.iconLight : ""}`}
                alt="menu"
                src={getAssetPath("img/general/icons/menu.svg")}
              />
            </button>
          </div>
        </div>
        <div className={styles.mobileSearch}>
          <HeaderSearch />
        </div>
      </header>

      {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
};
