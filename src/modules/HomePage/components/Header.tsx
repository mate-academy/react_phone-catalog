import React from 'react';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useFavourites } from '../../shared/context/FavouritesContext';

export const Header: React.FC = () => {
  const navigation = ['HOME', 'PHONES', 'TABLETS', 'ACCESSORIES'];
  const { favourites } = useFavourites();

  return (
    <>
      <header className={style.header}>
        <nav className={style.nav}>
          <div className={style.nav__left}>
            <div className={style.nav__logo}>
              <Link to="/">
                <img src="./logo/Logo.png" alt="Logo" />
              </Link>
            </div>
            <div className={style.nav__list}>
              <ul className={style.nav__select}>
                {navigation.map(item => (
                  <li className={style.nav__option} key={item}>
                    <a className={style.nav__link} href="/">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={style.nav__right}>
            <div className={style.nav__heart}>
              <Link to="/favorites">
                <img src="./icons/heart.png" alt="Favorites" />
                {favourites.length > 0 && (
                  <span className={style.nav__badge}>{favourites.length}</span>
                )}
              </Link>
            </div>
            <div className={style.nav__cart}>
              <a href="/">
                <img src="./icons/cart.png" alt="Cart" />
              </a>
            </div>
            <div className={style.nav__menu}>
              <a href="#menu">
                <img src="./icons/menu.png" alt="Menu" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      <aside className={style.aside} id="menu">
        <nav className={style.nav}>
          <div className={style.nav__left}>
            <div className={style.nav__logo}>
              <a href="/">
                <img src="./logo/Logo.png" alt="Logo" />
              </a>
            </div>
          </div>
          <div className={style.nav__right}>
            <div className={style.nav__close}>
              <a href="/">
                <img src="./icons/Close.png" alt="Close" />
              </a>
            </div>
          </div>
        </nav>
        <div className={style.nav__menuList}>
          <ul className={style.nav__menuSelect}>
            {navigation.map(item => (
              <li className={style.nav__option} key={item}>
                <a className={style.nav__link} href="/">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.nav__bottom}>
          <div className={style.nav__menuHeart}>
            <a href="/">
              <img src="./icons/heart.png" alt="Heart" />
            </a>
          </div>
          <div className={style.nav__menuCart}>
            <a href="/">
              <img src="./icons/cart.png" alt="Cart" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
