import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import './BurgerMenu.scss';
import { RootState } from '../../app/store';

interface Props {
  isOpen: boolean;
  closeMenu: () => void;
}

export const BurgerMenu: React.FC<Props> = ({ isOpen, closeMenu }) => {
  const likedProducts = useSelector((state: RootState) => state.likedProducts);
  const addedToCartProducts = useSelector(
    (state: RootState) => state.addedToCartProducts,
  );

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('burgerMenu__link', { 'burgerMenu__link--active': isActive });

  const getLinkSecondClass = ({ isActive }: { isActive: boolean }) =>
    classNames('sub-menu-links__sub-menu', {
      'sub-menu-links__sub-menu--active': isActive,
    });

  return (
    <>
      {isOpen && (
        <div className="burgerMenu">
          <nav className="burgerMenu__nav">
            <ul className="burgerMenu__menu">
              <li className="burgerMenu__menu-item">
                <NavLink to="/" className={getLinkClass} onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li className="burgerMenu__menu-item">
                <NavLink
                  to="/phones"
                  className={getLinkClass}
                  onClick={closeMenu}
                >
                  Phones
                </NavLink>
              </li>
              <li className="burgerMenu__menu-item">
                <NavLink
                  to="/tablets"
                  className={getLinkClass}
                  onClick={closeMenu}
                >
                  Tablets
                </NavLink>
              </li>
              <li className="burgerMenu__menu-item">
                <NavLink
                  to="/accessories"
                  className={getLinkClass}
                  onClick={closeMenu}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="burgerMenu__sub-menu-links">
            <NavLink
              to="/favorite"
              className={getLinkSecondClass}
              onClick={closeMenu}
            >
              <div className="sub-menu-links__icons">
                <span className="icon icon--like">
                  {likedProducts.length > 0 && (
                    <span className="sub-menu-links__badge">
                      {likedProducts.length}
                    </span>
                  )}
                </span>
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={getLinkSecondClass}
              onClick={closeMenu}
            >
              <div className="sub-menu-links__icons">
                <span className="icon icon--cart">
                  {addedToCartProducts.length > 0 && (
                    <span className="sub-menu-links__badge">
                      {addedToCartProducts.length}
                    </span>
                  )}
                </span>
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
