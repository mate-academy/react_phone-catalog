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
                    <Link
                      className={style.nav__link}
                      to={`/${item.toLowerCase()}`}
                    >
                      {item}
                    </Link>
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
              <Link to="/cart">
                <img src="./icons/cart.png" alt="Cart" />
              </Link>
            </div>
            <div className={style.nav__menu}>
              <Link to="/menu">
                <img src="./icons/menu.png" alt="Menu" />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
