import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import './Header.scss';

import burger from '../../../../public/icons/menu.svg';
import closeIcon from '../../../../public/icons/close.svg';
import favIcon from '../../../../public/icons/favourites.svg';
import favIconFilled from '../../../../public/icons/favourites-filled.svg';
import cart from '../../../../public/icons/shopping-cart.svg';

export const Header = () => {
  const [isMenuActive, setMenuActive] = useState(false);
  const [canTransform, setCanTransform] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const toggleBurgerMenu = () => {
    if (isMenuActive) {
      setCanTransform(false);
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        setMenuActive(false);
      }, 100);
    } else {
      setMenuActive(true);
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        setCanTransform(true);
      }, 1);
    }
  };

  return (
    <div className={classNames('top', { 'top--full-screen': isMenuActive })}>
      <div className="mobile-header top__mobile-header">
        <div className="logo mobile-header__logo"></div>
        <div
          className="burger mobile-header__burger"
          onClick={toggleBurgerMenu}
        >
          <img
            className="burger-icon"
            src={isMenuActive ? closeIcon : burger}
            alt="menu"
          />
        </div>
      </div>

      <div
        className={classNames('menu', 'top__menu', {
          'menu--active': isMenuActive,
          'menu--transform': canTransform,
        })}
      >
        <nav className={classNames('nav', 'menu__nav')}>
          <NavLink to="#" className="nav__item">
            home
          </NavLink>
          <NavLink to="#" className="nav__item">
            phones
          </NavLink>
          <NavLink to="#" className="nav__item">
            tablets
          </NavLink>
          <NavLink to="#" className="nav__item">
            accessories
          </NavLink>
        </nav>
        <div className={classNames('choice', 'menu__choice')}>
          <div
            className="choice__icon choice__icon--favorite"
            onClick={() => setIsFav(!isFav)}
          >
            <img className="icon" src={isFav ? favIconFilled : favIcon} />
          </div>
          <div className="choice__icon choice__icon--shopping-cart">
            <img className="icon" src={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};
