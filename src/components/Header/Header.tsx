import styles from "./Header.module.scss";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  function openMenu () {
    setIsOpen(!isOpen);
  }

  return (
    <>
    <header className={styles.header} id="header">
      <div className={styles["header__content"]}>
        <a href="#" className={styles["header__logo-link"]}>
          <img src="/img/Logo.png" alt="logo" className={styles["header__logo"]} />
        </a>
        <a onClick={openMenu} className={styles["header__menu-link"]}>
          <span className={styles["header__menu-line"]}></span>
          <img src="/img/Menu.png" alt="menu" className={styles["header__menu"]} />
        </a>
      </div>
    </header>

    <BurgerMenu onClose={openMenu} isOpen={isOpen} />
    </>
  )
}
