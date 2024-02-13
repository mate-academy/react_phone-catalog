import './MobileMenu.scss';
import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';

type Props = {
  isMenuShown: boolean,
  setIsMenuShown: (value: boolean) => void,
};

export const MobileMenu: React.FC<Props> = ({
  isMenuShown,
  setIsMenuShown,
}) => {
  return (
    <div className={classNames('mobile-menu', { 'menu-shown': isMenuShown })}>
      <div className="mobile-menu__top">
        <Link
          to="/"
          className="mobile-menu__logo-link"
          onClick={() => setIsMenuShown(false)}
        >
          <div className="mobile-menu__logo-link-image" />
        </Link>

        <button
          type="button"
          aria-label="button"
          className="mobile-menu__close-link"
          onClick={() => setIsMenuShown(false)}
        >
          <div className="mobile-menu__close-link-image icon icon-cross" />
        </button>
      </div>

      <div className="mobile-menu__container">
        <nav className="mobile-menu__nav">
          <ul className="mobile-menu__nav-list">
            <li className="mobile-menu__nav-list-item">
              <Link
                to="/"
                className="mobile-menu__nav-list-link"
                onClick={() => setIsMenuShown(false)}
              >
                Home
              </Link>
            </li>
            <li className="mobile-menu__nav-list-item">
              <Link
                to="/phones"
                className="mobile-menu__nav-list-link"
                onClick={() => setIsMenuShown(false)}
              >
                Phones
              </Link>
            </li>
            <li className="mobile-menu__nav-list-item">
              <Link
                to="/tablets"
                className="mobile-menu__nav-list-link"
                onClick={() => setIsMenuShown(false)}
              >
                Tablets
              </Link>
            </li>
            <li className="mobile-menu__nav-list-item">
              <Link
                to="/accessories"
                className="mobile-menu__nav-list-link"
                onClick={() => setIsMenuShown(false)}
              >
                Accessories
              </Link>
            </li>
            <li className="mobile-menu__nav-list-item">
              <Link
                to="/favourites"
                className="mobile-menu__nav-list-link"
                onClick={() => setIsMenuShown(false)}
              >
                Favourites
              </Link>
            </li>
            <li className="mobile-menu__nav-list-item">
              <Link
                to="/cart"
                className="mobile-menu__nav-list-link"
                onClick={() => setIsMenuShown(false)}
              >
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
