import React, { useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import cn from 'classnames';

import logoWhite from '../../assets/img/Logo.svg';
import logoDark from '../../assets/img/Logo-White.png';

import { Ellipse } from '../Ellipse/Ellipse';
import { DispatchContext, StateContext } from '../../context/ContextReducer';
import {
  changeElementStyleBackground,
  changeElementStyleBorderColor,
  changeElementStyleColor,
  changePseudoElementStyle,
} from '../../utils/findElementByClass';

export const Header: React.FC = () => {
  const { cartPhone, favoritesDevice: favoritesPhone } =
    useContext(StateContext);

  const { darkThem } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { pathname } = useLocation();

  const logo = darkThem ? logoDark : logoWhite;

  const DARK_BACKGROUND = '#0F1121';

  const DARK_GRAY = '#323542';

  // const PINK = '#905BFF';

  // const LIGHT_GRAY = '#161827';

  const LIGHT_BACKGROUND = '#fff';

  const NAV_LINK = '#75767F';

  useEffect(() => {
    if (darkThem) {
      document.body.style.backgroundColor = DARK_BACKGROUND;

      changeElementStyleBackground('Navbar', DARK_BACKGROUND);

      changeElementStyleColor('nav-list__link', NAV_LINK);

      changeElementStyleColor('nav-list__link is-active', LIGHT_BACKGROUND);

      changeElementStyleBorderColor(
        'nav-list__link is-active',
        LIGHT_BACKGROUND,
      );

      changePseudoElementStyle(
        '.nav-list__link',
        '::after',
        'border-color',
        LIGHT_BACKGROUND,
      );

      changeElementStyleColor('HomePage__title', LIGHT_BACKGROUND);

      changeElementStyleColor('BrandList__title', LIGHT_BACKGROUND);

      changeElementStyleColor('Category__title__text', LIGHT_BACKGROUND);

      changeElementStyleBackground('Slider__button', DARK_GRAY);
    }

    if (!darkThem) {
      document.body.style.backgroundColor = LIGHT_BACKGROUND;

      changeElementStyleBackground('Navbar', LIGHT_BACKGROUND);

      changeElementStyleColor('nav-list__link', NAV_LINK);

      changeElementStyleColor('nav-list__link is-active', DARK_BACKGROUND);

      changeElementStyleBorderColor(
        'nav-list__link is-active',
        DARK_BACKGROUND,
      );

      changePseudoElementStyle(
        '.nav-list__link',
        '::after',
        'border-color',
        DARK_BACKGROUND,
      );

      changeElementStyleColor('HomePage__title', DARK_BACKGROUND);

      changeElementStyleColor('HomePage__title', DARK_BACKGROUND);

      changeElementStyleColor('BrandList__title', DARK_BACKGROUND);

      changeElementStyleColor('Category__title__text', DARK_BACKGROUND);

      changeElementStyleBackground('Slider__button', LIGHT_BACKGROUND);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [darkThem, pathname]);

  const getClassLink = ({ isActive }: { isActive: boolean }) =>
    cn('nav-list__link', { 'is-active': isActive });

  const getClassIconFavorite = ({ isActive }: { isActive: boolean }) =>
    cn('enter-nav__icons__icon enter-nav__icons__icon--heart', {
      'is-active': isActive,
      dark: darkThem,
    });

  const getClassIconCard = ({ isActive }: { isActive: boolean }) =>
    cn('enter-nav__icons__icon enter-nav__icons__icon--bag', {
      'is-active': isActive,
      dark: darkThem,
    });

  const handleSwiththem = () => {
    dispatch({ type: 'switchThem' });
  };

  return (
    <div className={cn('Navbar', { dark: darkThem })}>
      <a href="/">
        <img src={logo} className="Navbar__logo" alt="logo" />
      </a>

      <div className="enter-nav">
        <div className="enter-nav__links">
          <ul className="nav-list">
            <li className="nav-list__item">
              <NavLink className={getClassLink} to={'/'}>
                Home
              </NavLink>
            </li>

            <li className="nav-list__item">
              <NavLink className={getClassLink} to={'phones'}>
                Phones
              </NavLink>
            </li>

            <li className="nav-list__item">
              <NavLink className={getClassLink} to={'tablets'}>
                Tablets
              </NavLink>
            </li>

            <li className="nav-list__item">
              <NavLink className={getClassLink} to={'accessories'}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="enter-nav__icons">
          <NavLink to="favorites" className={getClassIconFavorite}>
            {favoritesPhone && favoritesPhone.length !== 0 && (
              <div className="postion-tablet-desktop">
                <Ellipse device={favoritesPhone} />
              </div>
            )}
          </NavLink>

          <NavLink to="card" className={getClassIconCard}>
            {cartPhone && cartPhone.length !== 0 && (
              <div className="postion-tablet-desktop">
                <Ellipse device={cartPhone} />
              </div>
            )}
          </NavLink>

          <div
            className={cn('enter-nav__icons__icon-burger', { dark: darkThem })}
          >
            <NavLink
              to="sidebar"
              className={cn('enter-nav__icons__icon--burger', {
                dark: darkThem,
              })}
            ></NavLink>
          </div>

          <a
            onClick={handleSwiththem}
            className={cn('enter-nav__icons__icon--moon', { dark: darkThem })}
          ></a>
        </div>
      </div>
    </div>
  );
};
