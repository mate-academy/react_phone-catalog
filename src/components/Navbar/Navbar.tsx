import { NavLink } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { RootState, useAppSelector } from '../../redux/store';
import { loadComponentStyles, setTheme } from '../../redux/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Navbar.scss';

type ThemeType = 'theme0' | 'theme1' | 'theme2' | 'theme3' | 'theme4';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const currentTheme = useAppSelector(
    (state: { theme: { current: string; }; }) => state.theme.current);

  return (
    <nav
      data-cy="nav"
      role="navigation"
      aria-label="main navigation"
      className={`navbar-body ${currentTheme}`}
    >
      <div className={`navbar-container ${currentTheme}`}>
        current theme {currentTheme}<br/>
        <NavLink
          to="/"
          className={() => classNames(
            'navbar-item',
          )}
        >
          {t('navigation.logo')}
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => classNames(
            'navbar-item',
            { 'has-background-grey-lighter': isActive },
          )}
        >
          {t('navigation.home')}
        </NavLink>

        <NavLink
          to="/phones"
          className={({ isActive }) => classNames(
            'navbar-item',
            { 'has-background-grey-lighter': isActive },
          )}
        >
          {t('navigation.phones')}
        </NavLink>

        <NavLink
          to="/tablets"
          className={({ isActive }) => classNames(
            'navbar-item navbar-tablets',
            { 'has-background-grey-lighter': isActive },
          )}
        >
          {t('navigation.tablets')}
        </NavLink>

        <NavLink
          to="/accessories"
          className={({ isActive }) => classNames(
            'navbar-item',
            { 'has-background-grey-lighter': isActive },
          )}
        >
          {t('navigation.accessories')}
        </NavLink>

        <input type="text" placeholder={t('navigation.search_placeholder')} />

        <NavLink
          to="/favorites"
          className={({ isActive }) => classNames(
            'navbar-item',
            { 'has-background-grey-lighter': isActive },
          )}
        >
          {t('navigation.favorites')}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => classNames(
            'navbar-item',
            { 'has-background-grey-lighter': isActive },
          )}
        >
          {t('navigation.cart')}
        </NavLink>

        <LanguageSwitcher />

        <ThemeSwitcher />
      </div>
    </nav>
  );
};
