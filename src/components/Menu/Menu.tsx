import React, { useContext } from "react";
import { HeaderIconButton } from "../HeaderButtons";
import { getCount } from "../../utils";
import { StateContext } from "../../providers/GlobalStateProvider";
import styles from "./Menu.module.scss";
import { HeaderMenu } from "../HeaderMenu/HeaderMenu";

const buttonStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
};

const wrapperStyles: React.CSSProperties = {
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  padding: "24px",
};

export const Menu: React.FC = () => {
  const { favoriteIds, cartIds } = useContext(StateContext);

  return (
    <div className={styles.menu}>
      <header className={styles.header}>
        <a className={styles.logo} href="#">
          <img
            className="logo__image"
            alt="logo"
            src="/img/general/icons/Logo.svg"
          />
        </a>
        <button className={styles.button}>
          <img
            className="header__icon"
            alt="close"
            src="/img/general/icons/close.svg"
          />
        </button>
      </header>
      <HeaderMenu
        wrapperStyles={wrapperStyles}
        listStyles={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      />
      <div className={styles.buttons}>
        <HeaderIconButton
          icon="heart"
          buttonStyles={buttonStyles}
          count={getCount(favoriteIds)}
        />
        <HeaderIconButton
          icon="cart"
          buttonStyles={buttonStyles}
          count={getCount(cartIds)}
        />
      </div>
    </div>
  );
};
