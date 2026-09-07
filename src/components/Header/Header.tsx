import styles from "./Header.module.scss";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { FavoritesContext } from "../../context/FavoritesContext";
import { CartContext } from "../../context/CartContext";


export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites } = useContext(FavoritesContext);
  const { cartItems } = useContext(CartContext);

  const cartCount = cartItems.reduce((sum, item) => sum += item.quantity, 0);
  const favoritesCount = favorites.length;


  const location = useLocation();
  const isFavorites = location.pathname === "/favorites";
  const isCart = location.pathname === "/cart";

  function openMenu () {
    setIsOpen(!isOpen);
  }

  return (
    <>
    <header className={styles.header} id="header">
      <div className={styles["header__content"]}>
        <a href="#" className={styles["header__content__logo-link"]}>
          <img src="./img/Logo.png" alt="logo" className={styles["header__content__logo"]} />
        </a>
        <a onClick={openMenu} className={styles["header__content__menu-link"]}>
          <span className={styles["header__content__menu-line"]}></span>
          <img src="./img/Menu.png" alt="menu" className={styles["header__content__menu"]} />
        </a>
        <div className={styles["header__content__on-tablet-pc"]}>
          <div className={styles["header__content__on-tablet-pc__main"]}>
            <ul className={styles["header__content__on-tablet-pc__main__list"]}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    classNames(styles["header__content__on-tablet-pc__main__list__link"],
                      {
                        [styles["header__content__on-tablet-pc__main__list__link--active"]] : isActive
                      }
                  )}>
                    HOME
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    classNames(styles["header__content__on-tablet-pc__main__list__link"],
                      {
                        [styles["header__content__on-tablet-pc__main__list__link--active"]] : isActive
                      }
                  )}>
                    PHONES
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    classNames(styles["header__content__on-tablet-pc__main__list__link"],
                      {
                        [styles["header__content__on-tablet-pc__main__list__link--active"]] : isActive
                      }
                  )}>
                    TABLETS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    classNames(styles["header__content__on-tablet-pc__main__list__link"],
                      {
                        [styles["header__content__on-tablet-pc__main__list__link--active"]] : isActive
                      }
                  )}>
                    ACCESSORIES
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={styles["header__content__on-tablet-pc__block"]}>
            <Link to="/favorites">
              <button
                className={classNames(
                  styles["header__content__on-tablet-pc__block__button"],
                  { [styles["header__content__on-tablet-pc__block__button--active"]] : isFavorites }
                )}>
                <img
                  src="./img/heart.png"
                  alt="icon"
                  className={styles["header__content__on-tablet-pc__block__button__icon"]}
                />
                {favoritesCount > 0 && (
                  <span className={styles["header__content__on-tablet-pc__block__button__badge"]}>
                    {favoritesCount}
                  </span>
                )}
              </button>
            </Link>
            <Link to="/cart">
              <button
                className={classNames(
                  styles["header__content__on-tablet-pc__block__button"],
                  { [styles["header__content__on-tablet-pc__block__button--active"]] : isCart }
                  )}>
                <img
                  src="./img/Shopping-bag.png"
                  alt="icon"
                  className={styles["header__content__on-tablet-pc__block__button__icon"]}
                />
                {cartCount > 0 && (
                  <span className={styles["header__content__on-tablet-pc__block__button__badge"]}>
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>

    <BurgerMenu onClose={openMenu} isOpen={isOpen} />
    </>
  )
}
