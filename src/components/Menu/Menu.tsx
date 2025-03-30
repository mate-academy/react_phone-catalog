import { NavLink } from 'react-router-dom';
import { Header } from '../Header';
import './Menu.scss';
import { links } from '../../constants/common';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';

export const Menu = () => {
  const [animateClass, setAnimateClass] = useState('menu-slide-in');

  const favorites = useSelector((state: RootState) => state.favorites);
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    // Старт анімації при відкритті
    setTimeout(() => setAnimateClass('menu-slide-in active'), 10);

    return () => {
      // Плавне закриття (працює, якщо компонент не видаляється моментально)
      setAnimateClass('menu-slide-in hide');
    };
  }, []);

  return (
    <div className="wrapper">
      <Header />
      
      <div className={animateClass}>
        <main className="main page__main">
          <nav className="header__nav nav">
            <ul className="nav__list nav__list--menu">
              {links.map((link, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      classNames('nav__link', { active: isActive })
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </main>
      </div>

      <footer className="footer page__footer">
        <ul className="footer__actions">
          <li className="footer__actions-item footer__actions-item--favourite active">
            <NavLink
              to="favorites"
              className={({ isActive }) =>
                classNames('icon', 'icon--favourite', { active: isActive })
              }
            >
              {favorites.length > 0 && (
                <span className="favorite-count">{favorites.length}</span>
              )}
              <img src="./img/icons/favourites.svg" alt="favorite" />
            </NavLink>
          </li>
          <li className="footer__actions-item footer__actions-item--cart">
            <NavLink
              to="cart-page"
              className={({ isActive }) =>
                classNames('icon', 'icon--cart', { active: isActive })
              }
            >
              {cart.length > 0 && (
                <span className="favorite-count">{cart.length}</span>
              )}
              <img src="./img/icons/shopping-bag.svg" alt="shopping-bag" />
            </NavLink>
          </li>
        </ul>
      </footer>
    </div>
  );
};