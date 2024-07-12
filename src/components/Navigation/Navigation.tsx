import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { themeClass } from '../../utils/themeClass';
import Logo from '../../images/Logo.svg';
import LogoDark from '../../images/LogoDark.svg';
import Moon from '../../images/moon.svg';
import Sun from '../../images/sun.svg';
import LikedLight from '../../images/LikedLight.svg';
import LikedDark from '../../images/LikedDark.svg';
import CartLight from '../../images/CartLight.svg';
import CartDark from '../../images/CartDark.svg';
import menuLight from '../../images/menu-light.svg';
import menuDark from '../../images/menu-dark.svg';
import closeLight from '../../images/close-light.svg';
import closeDark from '../../images/close-dark.svg';
import { LikedContext } from '../LikedProvider/LikedProvider';
import { CartContext } from '../CartProvider/CartProvider';

export const Navigation = () => {
  const { light, toggleTheme } = useContext(ThemeContext);
  const [isOpened, setIsOpened] = useState(false);
  const { liked } = useContext(LikedContext);
  const { cartLength, cart, setCartLength } = useContext(CartContext);

  const getClassName = themeClass(light);

  const handleMenu = () => {
    setIsOpened(prev => !prev);
  };

  const handleLinkPhoneClick = () => {
    setIsOpened(false);
  };

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpened]);

  useEffect(() => {
    setCartLength(cart.length);
  }, [cart.length]);

  return (
    <header className={getClassName('header')}>
      <nav className={getClassName('nav')}>
        <div className={getClassName('nav__products')}>
          <NavLink to={'/'} className={getClassName('logo')}>
            {light ? (
              <img src={Logo} className="logo-light" alt="Logo" />
            ) : (
              <img src={LogoDark} className="logo-dark" alt="Logo" />
            )}
          </NavLink>

          <NavLink to={'/'} end className={getClassName('nav__products--link')}>
            Home
            <div className={'nav__products--link--underline'}></div>
          </NavLink>

          <NavLink
            to={'/phones'}
            className={getClassName('nav__products--link')}
          >
            Phones
            <div className={'nav__products--link--underline'}></div>
          </NavLink>

          <NavLink
            to={'/tablets'}
            className={getClassName('nav__products--link')}
          >
            Tablets
            <div className={'nav__products--link--underline'}></div>
          </NavLink>

          <NavLink
            to={'/accessories'}
            className={getClassName('nav__products--link')}
          >
            Accessories
            <div className={'nav__products--link--underline'}></div>
          </NavLink>
        </div>
        <div className={getClassName('nav__additional')}>
          {light ? (
            <img
              src={Moon}
              alt="Set light Theme"
              onClick={toggleTheme}
              className="theme__switcher"
            />
          ) : (
            <img
              src={Sun}
              alt="Set dark Theme"
              onClick={toggleTheme}
              className="theme__switcher"
            />
          )}

          <NavLink to="/liked" className={getClassName('liked')}>
            {light ? (
              <img src={LikedLight} alt="Liked" />
            ) : (
              <img src={LikedDark} alt="Liked" />
            )}

            {!!liked.length && <p className="circle">{liked.length}</p>}
          </NavLink>
          <NavLink to="/cart" className={getClassName('cart')}>
            {light ? (
              <img src={CartLight} alt="Cart" />
            ) : (
              <img src={CartDark} alt="Cart" />
            )}

            {!!cartLength && (
              <p className="circle">{cartLength ? cartLength : cart.length}</p>
            )}
          </NavLink>
        </div>
      </nav>

      <nav className={getClassName('nav-phone')}>
        <div className={getClassName('nav-phone__top')}>
          <NavLink to={'/'} className={getClassName('logo')}>
            {light ? (
              <img src={Logo} className="logo-light" alt="Logo" />
            ) : (
              <img src={LogoDark} className="logo-dark" alt="Logo" />
            )}
          </NavLink>

          <div className={getClassName('nav-phone__top--block')}>
            {light ? (
              <img
                src={Moon}
                alt="Set light Theme"
                onClick={toggleTheme}
                className="theme__switcher"
              />
            ) : (
              <img
                src={Sun}
                alt="Set dark Theme"
                onClick={toggleTheme}
                className="theme__switcher"
              />
            )}

            <button
              onClick={handleMenu}
              className={getClassName('menu-button')}
            >
              <img
                src={
                  isOpened
                    ? light
                      ? closeLight
                      : closeDark
                    : light
                      ? menuLight
                      : menuDark
                }
                alt={isOpened ? 'Close menu' : 'Open menu'}
              />
            </button>
          </div>
        </div>

        {isOpened && (
          <div className={getClassName('nav-phone__menu')}>
            <div className={getClassName('nav__products')}>
              <NavLink
                to={'/'}
                end
                className={getClassName('nav__products--link')}
                onClick={handleLinkPhoneClick}
              >
                Home
                <div className={'nav__products--link--underline'}></div>
              </NavLink>

              <NavLink
                to={'/phones'}
                className={getClassName('nav__products--link')}
                onClick={handleLinkPhoneClick}
              >
                Phones
                <div className={'nav__products--link--underline'}></div>
              </NavLink>

              <NavLink
                to={'/tablets'}
                className={getClassName('nav__products--link')}
                onClick={handleLinkPhoneClick}
              >
                Tablets
                <div className={'nav__products--link--underline'}></div>
              </NavLink>

              <NavLink
                to={'/accessories'}
                className={getClassName('nav__products--link')}
                onClick={handleLinkPhoneClick}
              >
                Accessories
                <div className={'nav__products--link--underline'}></div>
              </NavLink>
            </div>

            <div className={getClassName('nav__additional')}>
              <NavLink
                to="/liked"
                className={getClassName('liked')}
                onClick={handleLinkPhoneClick}
              >
                {light ? (
                  <img src={LikedLight} alt="Liked" />
                ) : (
                  <img src={LikedDark} alt="Liked" />
                )}

                <div className={'nav__products--link--underline'}></div>
              </NavLink>
              <NavLink
                to="/cart"
                className={getClassName('cart')}
                onClick={handleLinkPhoneClick}
              >
                {light ? (
                  <img src={CartLight} alt="Cart" />
                ) : (
                  <img src={CartDark} alt="Cart" />
                )}

                <div className={'nav__products--link--underline'}></div>
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
