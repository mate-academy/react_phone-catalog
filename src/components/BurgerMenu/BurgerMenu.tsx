import classNames from "classnames";
import styles from "./BurgerMenu.module.scss";
import { NavLink } from "react-router-dom";

interface BurgerMenuProps {
  isOpen: boolean,
  onClose: () => void
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
  return (
    <aside className={classNames(
      styles.burgerMenu,
      {[styles.burgerMenuOpen] : isOpen}
      )}
      id="menu"
    >
      <div className={styles["burgerMenu__head"]}>
        <a href="#" className={styles["burgerMenu__logo-link"]}>
          <img src="/img/Logo.png" alt="logo" className={styles["burgerMenu__logo"]} />
        </a>
        <button
          onClick={onClose}
          className={styles["burgerMenu__close-button"]}
        >
        <span className={styles["burgerMenu__line"]}></span>
          <img src="./img/close.png" alt="logo" className={styles["burgerMenu__close-logo"]}/>
        </button>
      </div>
      <div className={styles["burgerMenu__content"]}>
        <div className={styles["burgerMenu__main"]}>
          <ul className={styles["burgerMenu__main__list"]}>
            <li><NavLink to="/" className={styles["burgerMenu__main__link"]} onClick={onClose}>HOME</NavLink></li>
            <li><NavLink to="/phones" className={styles["burgerMenu__main__link"]} onClick={onClose}>PHONES</NavLink></li>
            <li><NavLink to="/tablets" className={styles["burgerMenu__main__link"]} onClick={onClose}>TABLETS</NavLink></li>
            <li><NavLink to="/accessories" className={styles["burgerMenu__main__link"]} onClick={onClose}>ACCESSORIES</NavLink></li>
          </ul>
        </div>
        <div className={styles["burgerMenu__block"]}>
          <button className={styles["burgerMenu__block__button"]}>
            <img src="./img/heart.png" alt="icon" className={styles["burgerMenu__block__icon"]}/>
          </button>
          <button className={styles["burgerMenu__block__button"]}>
            <img src="./img/Shopping-bag.png" alt="icon" className={styles["burgerMenu__block__icon"]}/>
          </button>
        </div>
      </div>
    </aside>
  )
}
