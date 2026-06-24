import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import header from './Header.module.scss';
import { CategoryContext } from '../../context/CategoryContext';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { Counter } from './components/Counter/Counter';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { currentCategory } = useContext(CategoryContext);

  const { totalItemsOfCart } = useContext(CartContext);

  const { totalItemsOfFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={header.header}>
        <div className={header['header__top-bar']}>
          <Link to="/" className={header.header__link__logo}>
            <img
              src="img/icons/Logo-main.png"
              alt="Nice Gadgets logo"
              className={header.header__icon__logo}
            />
          </Link>
          {isMenuOpen ? (
            <button
              className={header.header__link__burger}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img
                src="img/icons/close.svg"
                alt="Nice Gadgets logo"
                className={header.header__icon}
              />
            </button>
          ) : (
            <button
              className={header.header__link__burger}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img
                src="img/icons/burger-icon.svg"
                alt="Nice Gadgets logo"
                className={header.header__icon}
              />
            </button>
          )}
        </div>
      </header>
      <aside
        className={`${header.header__menu} ${header.menu} ${isMenuOpen ? header['header__menu--open'] : ''}`}
      >
        <nav className={header.menu__nav}>
          <ul className={header.menu__nav__list}>
            <li className={header.menu__nav__item}>
              <Link
                to="/"
                className={header.menu__nav__link}
                onClick={() => setIsMenuOpen(false)}
              >
                home
              </Link>
            </li>
            <li className={header.menu__nav__item}>
              <Link
                to="/phones"
                className={header.menu__nav__link}
                onClick={() => setIsMenuOpen(false)}
              >
                Phones
              </Link>
            </li>
            <li className={header.menu__nav__item}>
              <Link
                to="/tablets"
                className={header.menu__nav__link}
                onClick={() => setIsMenuOpen(false)}
              >
                tablets
              </Link>
            </li>
            <li className={header.menu__nav__item}>
              <Link
                to="/accessories"
                className={header.menu__nav__link}
                onClick={() => setIsMenuOpen(false)}
              >
                accessories
              </Link>
            </li>
          </ul>
        </nav>
        <div className={header.menu__icons}>
          <ul className={header.menu__icons__list}>
            <li
              className={`${header.menu__icons__item} ${header['menu__icons__item--border-right']}`}
            >
              <Link
                to="/favorites"
                className={header.menu__icons__link}
                onClick={() => setIsMenuOpen(false)}
              >
                <Counter
                  icon="img/icons/heart-like.svg"
                  count={totalItemsOfFavorites}
                  alt="Favourites icon"
                />
              </Link>
            </li>
            <li className={header.menu__icons__item}>
              <Link
                to="/cart"
                className={header.menu__icons__link}
                onClick={() => setIsMenuOpen(false)}
              >
                <Counter
                  icon="img/icons/shopping-bag.svg"
                  count={totalItemsOfCart}
                  alt="Cart icon"
                />
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <header className={`${header.header} ${header['header--big-screen']}`}>
        <div
          className={`${header['header__top-bar']} ${header['header__top-bar--big-screen']}`}
        >
          <div className={header.menu__nav__container}>
            <Link to="/" className={header.header__link__logo}>
              <img
                src="img/icons/Logo-main.png"
                alt="Nice Gadgets logo"
                className={header.header__icon__logo}
              />
            </Link>
            <nav
              className={`${header.menu__nav} ${header['menu__nav--big-screen']}`}
            >
              <ul
                className={`${header.menu__nav__list} ${header['header.menu__nav__list--big-screen']}`}
              >
                <li className={header.menu__nav__item}>
                  <Link
                    to="/"
                    className={`${header.menu__nav__link} ${currentCategory === undefined ? header['menu__nav__link--active'] : ''}`}
                  >
                    home
                  </Link>
                </li>
                <li className={header.menu__nav__item}>
                  <Link
                    to="/phones"
                    className={`${header.menu__nav__link} ${currentCategory === 'phones' ? header['menu__nav__link--active'] : ''}`}
                  >
                    Phones
                  </Link>
                </li>
                <li className={header.menu__nav__item}>
                  <Link
                    to="/tablets"
                    className={`${header.menu__nav__link} ${currentCategory === 'tablets' ? header['menu__nav__link--active'] : ''}`}
                  >
                    tablets
                  </Link>
                </li>
                <li className={header.menu__nav__item}>
                  <Link
                    to="/accessories"
                    className={`${header.menu__nav__link} ${currentCategory === 'accessories' ? header['menu__nav__link--active'] : ''}`}
                  >
                    accessories
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div
            className={`${header.menu__icons} ${header['menu__icons--big-screen']}`}
          >
            <ul
              className={`${header.menu__icons__list} ${header['menu__icons__list--big-screen']}`}
            >
              <li
                className={`${header.menu__icons__item} ${header['menu__icons__item--big-screen']} ${currentCategory === 'favorites' ? header['menu__icons__item--big-screen--active'] : ''}`}
              >
                <Link to="/favorites" className={header.menu__icons__link}>
                  <Counter
                    icon="img/icons/heart-like.svg"
                    count={totalItemsOfFavorites}
                    alt="Favourites icon"
                  />
                </Link>
              </li>
              <li
                className={`${header.menu__icons__item} ${header['menu__icons__item--big-screen']} ${currentCategory === 'cart' ? header['menu__icons__item--big-screen--active'] : ''}`}
              >
                <Link to="/cart" className={header.menu__icons__link}>
                  <Counter
                    icon="img/icons/shopping-bag.svg"
                    count={totalItemsOfCart}
                    alt="Cart icon"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};
