import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { favouritesImg, bagImg } from '../../utils/indes';

import './BurgerMenu.scss';

interface Props {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const getStylelinkNavBurger = ({ isActive }: { isActive: boolean }) => {
  return classNames('navBurger__item', {
    ['activeBurger']: isActive,
  });
};

const getStylelinkActionsBurger = ({ isActive }: { isActive: boolean }) => {
  return classNames('burgerActions__link', {
    ['activeBurger']: isActive,
  });
};

const BurgerMenu: React.FC<Props> = ({ isMenuOpen, toggleMenu }) => {
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  return (
    <div
      className={classNames('burgerMenu', {
        ['burgerMenu__show']: isMenuOpen,
      })}
      aria-expanded={isMenuOpen}
    >
      <nav className="navBurger" role="navigation">
        <NavLink to="/" className={getStylelinkNavBurger} onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink
          to="/phones"
          className={getStylelinkNavBurger}
          onClick={toggleMenu}
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={getStylelinkNavBurger}
          onClick={toggleMenu}
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={getStylelinkNavBurger}
          onClick={toggleMenu}
        >
          Accessories
        </NavLink>
      </nav>

      <div className="burgerActions">
        <NavLink
          to="/favourites"
          className={getStylelinkActionsBurger}
          onClick={toggleMenu}
        >
          <div className="burgerActions__link-img">
            <img src={favouritesImg} alt="FavouritesImg" />
          </div>
        </NavLink>

        <NavLink
          to="/cart"
          className={getStylelinkActionsBurger}
          onClick={toggleMenu}
        >
          <div className="burgerActions__link-img">
            <img src={bagImg} alt="BagImg" />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default BurgerMenu;
