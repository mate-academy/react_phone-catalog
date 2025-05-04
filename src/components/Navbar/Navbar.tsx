import { NavLink } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { RootState, useAppSelector } from '../../redux/store';
import { loadComponentStyles, setTheme } from '../../redux/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './Navbar.scss';

type ThemeType = 'theme0' | 'theme1' | 'theme2' | 'theme3' | 'theme4';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidth;
};

const FullNavbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentTheme = useAppSelector(
    (state: { theme: { current: string }; }) => state.theme.current);

  const { t } = useTranslation();

  return (
    <nav
      data-cy="nav"
      role="navigation"
      aria-label="main navigation"
      className={`navbar-body ${currentTheme}`}
    >
      <div className="navbar-burger"
        onClick={() => setSidebarOpen(true)}
      >🍔</div>
      <div className={`navbar-container ${currentTheme} ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      >
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

        <input
          type="text"
          placeholder={t('navigation.search_placeholder')}
          onClick={(e) => e.stopPropagation()}
        />

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

        <div onClick={(e) => e.stopPropagation()}>
          <LanguageSwitcher />
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};


export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 640;

  return isMobile ? (
    <FullNavbar />
  ) : (
    <FullNavbar />
  );
};
