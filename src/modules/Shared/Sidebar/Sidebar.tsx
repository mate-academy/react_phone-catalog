import style from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import type { Dispatch, SetStateAction } from 'react';

interface Sidebarprops {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ isMenuOpen, setIsMenuOpen }: Sidebarprops) => {
  const closeSideBar = () => {
    setIsMenuOpen(false);
    document.querySelector('.App')?.classList.remove('app--noscroll')
    // document.body.classList.remove('body--noscroll');
  };
  return (
    <aside className={`${style.menu} ${isMenuOpen ? style.active : ''}`}>
      <div className={style.menu__container}>
        <NavLink to="/" className={style.menu__logo}>
          <img
            src="./img/logo/Logo.svg"
            alt="logo"
            className={style.menu__logo__image}
            onClick={() => {
              closeSideBar();
            }}
          />
        </NavLink>

        <div className={style.menu__icons}>
          <button
            className={style.menu__icons__close}
            onClick={() => {
              closeSideBar();
            }}
          >
          </button>
        </div>
      </div>

      <nav className={style.menu__nav}>
        <NavLink
          to="/"
          className={style.menu__nav__link}
          onClick={() => {
            closeSideBar();
          }}
        >
          home
        </NavLink>
        <NavLink
          to="/phones"
          className={style.menu__nav__link}
          onClick={() => {
            closeSideBar();
          }}
        >
          phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={style.menu__nav__link}
          onClick={() => {
            closeSideBar();
          }}
        >
          tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={style.menu__nav__link}
          onClick={() => {
            closeSideBar();
          }}
        >
          accessories
        </NavLink>
      </nav>

      <footer className={style.menu__footer}>
        <NavLink
          to="/favourites"
          className={style.menu__footer__favourites}
        ></NavLink>
        <NavLink to="/cart" className={style.menu__footer__cart}></NavLink>
      </footer>
    </aside>
  );
};
