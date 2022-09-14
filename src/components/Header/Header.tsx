import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import '../../styles/Nav.scss';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

export const Header: React.FC = () => {
  const favoritesSize = useAppSelector((state: RootState) => (
    state.favorite.favorites)).length;
  const withdraw = useAppSelector((state: RootState) => (
    state.withdraw.withdraw));

  const withdrawSize = useMemo(() => {
    let counter = 0;

    Object.keys(withdraw).forEach(e => {
      counter += withdraw[e];
    });

    return counter;
  }, [withdraw]);

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__right">
          <div className="logo">
            <NavLink
              to="/home"
              className="logo__link"
            >
              <img
                src="/img/header/logo.svg"
                alt="logo"
                className="logo__img"
              />
            </NavLink>
          </div>

          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/home"
                  className={({ isActive }) => classNames(
                    'nav__link',
                    { 'is-active': isActive },
                  )}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/phones"
                  className={({ isActive }) => classNames(
                    'nav__link',
                    { 'is-active': isActive },
                  )}
                >
                  Phones
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/tablets"
                  className={({ isActive }) => classNames(
                    'nav__link',
                    { 'is-active': isActive },
                  )}
                >
                  Tablets
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/accessories"
                  className={({ isActive }) => classNames(
                    'nav__link',
                    { 'is-active': isActive },
                  )}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header__left">
          <NavLink
            to="/favourites"
            className={({ isActive }) => classNames(
              'header__icon',
              { 'is-active': isActive },
            )}
          >
            {favoritesSize > 0
            && (
              <p className="header__ellipse">
                {favoritesSize}
              </p>
            )}
            <img src="/img/header/favorite(Stroke).svg" alt="Favorite" />
          </NavLink>
          <NavLink
            to="/withdraw"
            className={({ isActive }) => classNames(
              'header__icon',
              { 'is-active': isActive },
            )}
          >
            {withdrawSize > 0
              && (
                <p className="header__ellipse">
                  {withdrawSize}
                </p>
              )}
            <img src="/img/header/withdraw.svg" alt="Withdraw" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
