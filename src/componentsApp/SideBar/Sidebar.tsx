import React, { useContext, useEffect } from 'react';
import './Sidebar.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Ellipse } from '../Ellipse/Ellipse';
import { StateContext } from '../../context/ContextReducer';

import logoWhite from '../../assets/img/Logo.svg';
import logoDark from '../../assets/img/Logo-White.png';
import { changeElementStyleBackground } from '../../utils/findElementByClass';

export const Sidebar: React.FC = () => {
  const {
    favoritesDevice: favoritesPhone,
    cartPhone,
    darkThem,
  } = useContext(StateContext);
  const navigate = useNavigate();

  const logo = darkThem ? logoDark : logoWhite;

  const getClassLink = ({ isActive }: { isActive: boolean }) =>
    cn('nav-list__link', { 'is-active': isActive });

  const DARK_BACKGROUND = '#0F1121';

  // const PINK = '#905BFF';

  // const LIGHT_GRAY = '#161827';

  const LIGHT_BACKGROUND = '#fff';

  useEffect(() => {
    if (darkThem) {
      document.body.style.backgroundColor = DARK_BACKGROUND;

      changeElementStyleBackground('Navbar', DARK_BACKGROUND);
    }

    if (!darkThem) {
      document.body.style.backgroundColor = LIGHT_BACKGROUND;

      changeElementStyleBackground('Navbar', LIGHT_BACKGROUND);
    }
  }, [darkThem]);

  return (
    <>
      <div className={cn('Navbar', { dark: darkThem })}>
        <a href="/">
          <img src={logo} className="Navbar__logo" alt="logo" />
        </a>

        <div className="enter-nav__icons">
          <button
            onClick={() => navigate(-1)}
            className={cn('enter-nav__icons__icon-close', { dark: darkThem })}
          ></button>
        </div>
      </div>

      <nav className="nav-links">
        <ul className="nav-items">
          <li className="nav-item">
            <NavLink to="/" className={getClassLink}>
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/phones" className={getClassLink}>
              Phones
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/tablets" className={getClassLink}>
              Tablets
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/accessories" className={getClassLink}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div
        className="relative-position-button"
        style={{ height: 'calc(100vh - 101px)' }}
      >
        <div className="footer-links">
          <NavLink
            to="/favorites"
            className={cn('footer-links__link footer-links__link--heart', {
              dark: darkThem,
            })}
          >
            {true && (
              <div className="postion-phone">
                <Ellipse device={favoritesPhone} />
              </div>
            )}
          </NavLink>

          <NavLink
            to="/card"
            className={cn('footer-links__link footer-links__link--bag', {
              dark: darkThem,
            })}
          >
            {true && (
              <div className="postion-phone">
                <Ellipse device={cartPhone} />
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </>
  );
};
