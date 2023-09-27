import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { useViewport } from '../../helpers/useViewport';

import { Logo } from '../Logo';
import { Menu } from '../Menu';

import './navigation.scss';

function getActiveClass({ isActive }: { isActive: boolean }) {
  return classNames('navigation__page-link', 'navigation__after', {
    'navigation__page-link--active': isActive,
  });
}

export const Navigation: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { isTabletSize, width } = useViewport();

  useEffect(() => {
    if (!isTabletSize) {
      setIsMenuOpened(false);
    }
  }, [width]);

  return (
    <header className="navigation">
      <CSSTransition
        in={isMenuOpened}
        timeout={400}
        classNames="menu-fade"
        unmountOnExit
      >
        <Menu onOpen={setIsMenuOpened} />
      </CSSTransition>

      <nav className="navigation__content" aria-label="header-navigation">
        <ul className="navigation__left-side">
          {isTabletSize && (
            <li
              className="navigation__item"
              onClick={() => setIsMenuOpened(true)}
              aria-hidden="true"
            >
              <div className="navigation__menu" />
            </li>
          ) }

          <li className="navigation__item">
            <Logo />
          </li>

          {!isTabletSize && (
            <>
              <li className="navigation__item">
                <NavLink to="/" className={getActiveClass}>
                  Home
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink to="/phones" className={getActiveClass}>
                  Phones
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink to="/tablets" className={getActiveClass}>
                  Tablets
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink to="/accessories" className={getActiveClass}>
                  Accessories
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="navigation__right-side">
          <div className="navigation__icon-box">
            <NavLink
              to="/favorites"
              className={({ isActive }) => {
                return classNames(
                  'navigation__icon',
                  'navigation__icon--favorites',
                  'navigation__after',
                  { 'navigation__icon--active': isActive },
                );
              }}
            />
          </div>

          <div className="navigation__icon-box">
            <NavLink
              to="/cart"
              className={({ isActive }) => {
                return classNames(
                  'navigation__icon',
                  'navigation__icon--cart',
                  'navigation__after',
                  { 'navigation__icon--active': isActive },
                );
              }}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
