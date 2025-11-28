import { useEffect, useState } from 'react';
import style from './Header.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { Sidebar } from '../Sidebar';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={style.header}>
        <div className={style.header__container}>
          <NavLink to="/" className={style.header__logo}>
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
              className={style['header__icons__favourites']}
            />
            <NavLink to="/cart" className={style['header__icons__bag']} />
            <button
              className={style['header__icons__burger']}
              onClick={() => {
                setIsMenuOpen(true);
                document.body.classList.add('body--noscroll');
              }}
            />
          </div>
        </div>
      </header>

      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};
