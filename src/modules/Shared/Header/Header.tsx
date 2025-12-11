import { useEffect, useState } from 'react';
import style from './Header.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { Sidebar } from '../Sidebar';

interface HeadeProps {
  cartCounter: number;
  favouriteCounter: number;
}

export const Header = ({ cartCounter, favouriteCounter }: HeadeProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={style.header}>
        <div className={style.header__container}>
          <NavLink
            to="/"
            className={style.header__logo}
            onClick={() => {
              document.querySelector('.App')?.classList.remove('app--noscroll');

              // document.body.classList.remove('body--noscroll');
            }}
          >
            <img
              src="./img/logo/Logo.svg"
              alt="logo"
              className={style.header__logo__image}
            />
          </NavLink>

          <nav className={style.header__nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${style.header__nav__link} ${isActive ? style['is-active'] : ''}`
              }
            >
              home
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${style.header__nav__link} ${isActive ? style['is-active'] : ''}`
              }
            >
              phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                `${style.header__nav__link} ${isActive ? style['is-active'] : ''}`
              }
            >
              tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${style.header__nav__link} ${isActive ? style['is-active'] : ''}`
              }
            >
              accessories
            </NavLink>
          </nav>

          <div className={style.header__icons}>
            <NavLink
              to="/favourites"
              className={style.header__icons__favourites}
            >
              {' '}
              {favouriteCounter > 0 && (
                <span className={style.header__icons__badge}>
                  {favouriteCounter}
                </span>
              )}
            </NavLink>
            <NavLink to="/cart" className={style.header__icons__bag}>
              {cartCounter > 0 && (
                <span className={style.header__icons__badge}>
                  {cartCounter}
                </span>
              )}
            </NavLink>
            <button
              className={style.header__icons__burger}
              onClick={() => {
                setIsMenuOpen(true);
                document.querySelector('.App')?.classList.add('app--noscroll');
              }}
            />
          </div>
        </div>
      </header>

      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};
