import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Header.scss';
import classNames from 'classnames';
import { RootState } from '../../app/store';

type Props = {
  toggleBurger: () => void;
  isBurgerOpen: boolean;
};

export const Header: React.FC<Props> = ({ toggleBurger, isBurgerOpen }) => {
  const likedProducts = useSelector((state: RootState) => state.likedProducts);
  const addedToCartProducts = useSelector(
    (state: RootState) => state.addedToCartProducts,
  );

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('menu__link', { 'menu__link--active': isActive });

  const getLinkSecondClass = ({ isActive }: { isActive: boolean }) =>
    classNames({ 'header__sub-menu--active': isActive });

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__logo">
          <Link to="/" className="header__logo--icon"></Link>
        </div>

        <nav className="header__nav">
          <ul className="menu">
            <li className="menu__item">
              <NavLink to="/" className={getLinkClass}>
                Home
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/phones" className={getLinkClass}>
                Phones
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/tablets" className={getLinkClass}>
                Tablets
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/accessories" className={getLinkClass}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__sub-menu">
        <NavLink to="/favorite" className={getLinkSecondClass}>
          <div className="icons">
            <span className="icon icon--like">
              {likedProducts.length > 0 && (
                <span className="icon__badge icon__badge--like">
                  {likedProducts.length}
                </span>
              )}
            </span>
          </div>
        </NavLink>

        <NavLink to="/cart" className={getLinkSecondClass}>
          <div className="icons">
            <span className="icon icon--cart">
              {addedToCartProducts.length > 0 && (
                <span className="icon__badge icon__badge--cart">
                  {addedToCartProducts.length}
                </span>
              )}
            </span>
            {/* {addedToCartProducts.length > 0 && (
              <span className="icon__badge icon__badge--cart">{addedToCartProducts.length}</span>
            )} */}
          </div>
        </NavLink>

        <div className="header__sub-menu">
          <div className="icons icons--burger-menu" onClick={toggleBurger}>
            <span
              className={
                isBurgerOpen ? 'icon icon--close' : 'icon icon--burger-menu'
              }
            ></span>
          </div>
        </div>
      </div>
    </header>
  );
};
