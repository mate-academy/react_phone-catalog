import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';
import { Action } from '../Action';
import { Navigation } from '../Navigation';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    if (menuIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuIsOpen]);

  return (
    <header className={s.header} id="header">
      <NavLink
        to="/"
        className={s.header__logo}
        onClick={() => setMenuIsOpen(false)}
      >
        <picture>
          <source
            media="(max-width: 1199px)"
            srcSet="/img/icons/Logo-tab.svg"
          />
          <source media="(max-width: 639px)" srcSet="/img/icons/Logo-mob.svg" />
          <img
            className={s.header__icon}
            src="/img/icons/Logo.svg"
            alt="logo"
          />
        </picture>
      </NavLink>

      <button
        className={s['header__burger-btn']}
        onClick={() => setMenuIsOpen(true)}
      >
        <img src={'/img/icons/Menu.png'} alt="burger_menu" />
      </button>
      <div
        className={`${s.header__menu} ${menuIsOpen ? `${s['header__menu--active']}` : ''}`}
      >
        <Navigation setMenuIsOpen={setMenuIsOpen} />
        <Action setMenuIsOpen={setMenuIsOpen} />
      </div>

      <aside
        className={`${s.header__aside} ${menuIsOpen ? s['header__aside--open'] : ''} `}
      >
        <div className={s['header__inner-header']}>
          <NavLink
            to="/"
            className={s.header__logo}
            onClick={() => setMenuIsOpen(false)}
          >
            <img
              className={s.header__icon}
              src="/img/icons/Logo-mob.svg"
              alt="logo"
            />
          </NavLink>

          <button
            className={s['header__burger-btn']}
            onClick={() => setMenuIsOpen(false)}
          >
            <img src={'/img/icons/Close.png'} alt="burger_menu" />
          </button>
        </div>
        <div className={s.header__nav}>
          <Navigation setMenuIsOpen={setMenuIsOpen} />
        </div>

        <Action setMenuIsOpen={setMenuIsOpen} />
      </aside>
    </header>
  );
};
