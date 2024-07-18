import React from 'react';
import { Link } from 'react-router-dom';
import './menu.scss';
import { useAppSelector } from '../../../../app/hooks';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';

export const Menu: React.FC = () => {
  const { theme } = useAppSelector(state => state.theme);

  return (
    <aside className="menu__page menu" id="menu">
      <div className="menu__block">
        <div className="menu__top">
          <Link to="/" className="icon icon--logo">
            <img
              src={`nav/logo${theme === 'dark' ? '-dark' : ''}.svg`}
              alt="logo"
            />
          </Link>
          <Link to="/" className="icon icon--block icon--close">
            <img
              src={`nav/close${theme === 'dark' ? ' dark' : ''}.svg`}
              alt="logo"
            />
          </Link>
        </div>
        <ul className="menu__ul">
          <li className="menu__list">
            <Link to="home" className="menu__link">
              Home
            </Link>
          </li>
          <li className="menu__list">
            <Link to="/product/phones" className="menu__link">
              Phones
            </Link>
          </li>
          <li className="menu__list">
            <Link to="/product/tablets" className="menu__link">
              Tablets
            </Link>
          </li>
          <li className="menu__list">
            <Link to="/product/accessories" className="menu__link">
              Accessories
            </Link>
          </li>
        </ul>
      </div>

      <div className="menu__bottom">
        <div className="icon icon--nav-menu icon--nav-favourites">
          <ThemeSwitch />
        </div>
        <div className="icon icon--nav-menu icon--nav-favourites">Lang</div>
        <Link
          to="/favorites"
          className="icon icon--nav-menu icon--nav-favourites"
        >
          <img
            src={`nav/favourites${theme === 'dark' ? '-dark' : ''}.svg`}
            alt="favourites"
          />
        </Link>
        <Link to="/cart" className="icon icon--nav-menu icon--nav-cart">
          <img
            src={`nav/cart${theme === 'dark' ? '-dark' : ''}.svg`}
            alt="cart"
          />
        </Link>
      </div>
    </aside>
  );
};
