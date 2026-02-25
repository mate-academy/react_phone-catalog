import React, { useContext } from "react";
import { HeaderIconButton } from "../HeaderButtons";
import styles from "./Header.module.scss";
import { Logo } from "../Logo";
import { StateContext } from "../../providers/GlobalStateProvider";
import { getCount } from "../../utils";
import { HeaderMenu } from "../HeaderMenu";

export const Header: React.FC = () => {
  const { favoriteIds, cartIds } = useContext(StateContext);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Logo />
        <HeaderMenu />
      </div>
      <div className={styles.buttons}>
        <HeaderIconButton icon="heart" count={getCount(favoriteIds)} />
        <HeaderIconButton icon="cart" count={getCount(cartIds)} />
        <button className={styles.button}>
          <img
            className={styles.icon}
            alt="menu"
            src="/img/general/icons/menu.svg"
          />
        </button>
      </div>
    </header>
  );
};
