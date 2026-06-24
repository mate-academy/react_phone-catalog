import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../../styles/style.scss';
import { icons } from '../../utils/icons';
import { FavouritesContext } from '../Context/FavouritesContext';
import { CartsContext } from '../Context/CartsContext';

export const Footer = () => {
  const { favourites } = useContext(FavouritesContext);
  const { carts } = useContext(CartsContext);
  const location = useLocation();
  const isMenuOpen = location.pathname === '/menu';

  const isFavourite = favourites.length !== 0;
  const isCart = carts.length !== 0;

  return (
    <footer className="footer text-uppercase">
      {isMenuOpen ? (
        <div className="footer__menu">
          <NavLink
            to="/favourites"
            end
            className="logo logo__f logo__f--footer"
          >
            <div className="icon-wrapper">
              <img
                className="icon icon__favourites icon__favourites--footer"
                src={icons.logoFavourites}
                alt="Logo"
              />
              {isFavourite && (
                <span className="badge badge--count">{favourites.length}</span>
              )}
            </div>
          </NavLink>
          <NavLink to="/carts" end className="logo logo__c logo__c--footer">
            <div className="icon-wrapper">
              <img
                className="icon icon__carts icon__carts--footer"
                src={icons.logoCarts}
                alt="Logo"
              />
              {isCart && (
                <span className="badge badge--count">{carts.length}</span>
              )}
            </div>
          </NavLink>
        </div>
      ) : (
        <div className="footer__content">
          <div className="footer__icon">
            <NavLink to="/" end className="logo logo--home">
              <img
                className="icon icon--footer"
                src={icons.logoMain}
                alt="Logo"
              />
            </NavLink>
          </div>

          <div className="footer__container">
            <li className="nav__link">
              <a
                className="nav__item"
                href="https://github.com/zaurmamedov"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>

            <NavLink to="/contacts" end className="nav__item">
              Contacts
            </NavLink>

            <a
              className="nav__item"
              href="https://github.com/zaurmamedov"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rights
            </a>
          </div>

          <div className="footer__bottom">
            <button
              className="to-top-button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="to-top-button__text text-small">
                Back to top
              </span>
              <img
                className="icon icon--to-top"
                src={icons.logoToTop}
                alt=""
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
