import s from './Header.module.scss';
import logo from '../../icons/Logo.png';
import burgerMenu from '../../icons/Menu.png';
import closeMenu from '../../icons/Close.png';
import favorites from '../../icons/Favourites.png';
import shopping from '../../icons/Shopping.png';
import { useState } from 'react';
import classNames from 'classnames';

export const Header = () => {
  const [isManuActive, setIsActiveMenu] = useState(false);

  return (
    <header className={s.header}>
      <div className={s.logo}>
        <img alt="logo" src={logo} className={s.logo__item} />
      </div>

      <div
        className={classNames(s.menu, s.menuIs)}
        onClick={() => setIsActiveMenu(prevValue => !prevValue)}
      >
        {isManuActive ? (
          <img alt="CloseMenu" src={closeMenu} className={s.menu__item} />
        ) : (
          <img alt="BurgerMenu" src={burgerMenu} className={s.menu__item} />
        )}
      </div>

      <nav
        className={classNames(s.nav, {
          [s.navMobile]: isManuActive,
        })}
      >
        <ul className={s.nav__list}>
          <li className={s.nav__listItem}>home</li>
          <li className={s.nav__listItem}>Phones</li>
          <li className={s.nav__listItem}>tablets</li>
          <li className={s.nav__listItem}>accessories</li>
        </ul>

        <div
          className={classNames({
            [s.menu]: !isManuActive,
            [s.menuMobile]: isManuActive,
          })}
        >
          <div className={s.menu__box}>
            <img
              alt="favorites"
              src={favorites}
              className={classNames({
                [s.menu__item]: !isManuActive,
                [s.menuMobile__item]: isManuActive,
              })}
            />
          </div>

          <div className={s.menu__box}>
            <img
              alt="shopping"
              src={shopping}
              className={classNames({
                [s.menu__item]: !isManuActive,
                [s.menuMobile__item]: isManuActive,
              })}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
