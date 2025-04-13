import React, { useContext } from 'react';
import s from './NavMenu.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { BurgerContext } from '../../../context/BurgerContext';
import { useTheme } from '../../../../hooks/useTheme';
import { useTranslation } from 'react-i18next';

type Props = {
  burgerMenu?: boolean;
};

export const NavMenu: React.FC<Props> = ({ burgerMenu = false }) => {
  const { t } = useTranslation('Header');
  const { setBurgerMenuActivate } = useContext(BurgerContext);
  const [theme, setTheme] = useTheme();
  const closeBurgerMenu = () => setBurgerMenuActivate(false);
  const navItemClass = classNames(s.nav__item, {
    [s.onMobile]: burgerMenu,
  });
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(s.nav__link, {
      [s.is_active]: isActive,
      [s.onMobile]: burgerMenu,
    });

  const handleSwitchTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <div className={s.nav__wrapper}>
      <nav className={classNames(s.nav, { [s.onMobile]: burgerMenu })}>
        <ul
          className={classNames(s.nav__list, {
            [s.onMobile]: burgerMenu,
          })}
        >
          <li className={navItemClass}>
            <NavLink to="/" className={getLinkClass} onClick={closeBurgerMenu}>
              <p>{t('home')}</p>
            </NavLink>
          </li>
          <li className={navItemClass}>
            <NavLink
              to="/phones"
              className={getLinkClass}
              onClick={closeBurgerMenu}
            >
              <p>{t('phones')}</p>
            </NavLink>
          </li>
          <li className={navItemClass}>
            <NavLink
              to="/tablets"
              className={getLinkClass}
              onClick={closeBurgerMenu}
            >
              <p>{t('tablets')}</p>
            </NavLink>
          </li>
          <li className={navItemClass}>
            <NavLink
              to="/accessories"
              className={getLinkClass}
              onClick={closeBurgerMenu}
            >
              <p>{t('accessories')}</p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div
        className={classNames(s.theme, {
          [s.onMobile]: burgerMenu,
        })}
        onClick={handleSwitchTheme}
      >
        <div
          className={classNames(s.theme__button, {
            [s.light]: theme === 'light',
          })}
        ></div>
      </div>
    </div>
  );
};
