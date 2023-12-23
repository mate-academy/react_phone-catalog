import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '../Reducers/store';
import logo from '../images/Logo.svg';
import favIcon from '../images/icons/Favourites.svg';
import cart from '../images/icons/Cart.svg';
import { NavMenu } from './NavMenu';

function getWindowSize() {
  const width = window.innerWidth;

  return width;
}

export const Header: React.FC = () => {
  const favsList = useSelector((state: RootState) => state.favorites);
  const cartList = useSelector((state: RootState) => state.cart);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [isVisible, setIsVisible] = useState(false);
  const [side, setSide] = useState('header');

  function handleWindowResize() {
    setWindowSize(getWindowSize());

    if (windowSize < 640) {
      setSide('side');
    } else {
      setSide('header');
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="header__content">
          <nav className="header__nav">
            <Link to="/" className="header__logo">
              <img
                src={logo}
                alt="logo"
              />
            </Link>

            {windowSize > 640 ? (
              <NavMenu
                side={side}
                visible={isVisible}
                setVisible={setIsVisible}
              />
            ) : (
              <button
                aria-label="menu"
                type="button"
                className="button__menu"
                onClick={() => setIsVisible(v => !v)}
              />
            )}
          </nav>

          <div className="header__buttons">
            <NavLink
              to="/favorites"
              className={({ isActive }) => classNames(
                'header__buttons--link',
                { 'header__buttons--link--active': isActive },
              )}
            >
              <button
                type="button"
                className="button button__fav"
                data-counter={`${favsList.length}`}
              >
                <img
                  src={favIcon}
                  alt="favorites"
                  className="button__fav--image"
                />
                {favsList.length > 0 && (
                  <span className="header__total-items">{favsList.length}</span>
                )}
              </button>
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) => classNames(
                'header__buttons--link',
                { 'header__buttons--link--active': isActive },
              )}
            >
              <button
                type="button"
                className="button button__cart"
                data-counter={`${cartList.length}`}
              >
                <img
                  src={cart}
                  alt="cart"
                  className="button__cart--image"
                />
                {cartList.length > 0 && (
                  <span className="header__total-items">{cartList.length}</span>
                )}
              </button>
            </NavLink>
          </div>
        </div>
      </header>

      {isVisible && (
        <NavMenu side="side" visible={isVisible} setVisible={setIsVisible} />
      )}
    </>
  );
};
