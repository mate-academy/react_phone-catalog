import { NavLink } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../redux/store';
import { loadComponentStyles, setTheme } from '../../redux/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

type ThemeType = 'theme0' | 'theme1' | 'theme2' | 'theme3' | 'theme4';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { currentTheme, loadedStyles } = useSelector((state: RootState) =>
    state.theme);
  const componentName = 'Navbar';
  const styleKey = `${componentName}_${currentTheme}`;

  useEffect(() => {
    // Завантажуємо стилі, якщо вони ще не завантажені
    if (!loadedStyles[styleKey]) {
      dispatch(loadComponentStyles({ componentName, theme: currentTheme }));
    }
  }, [currentTheme, dispatch, loadedStyles, styleKey]);

  /*   useEffect(() => {
    // Завантажуємо стилі, якщо вони ще не завантажені
    if (!loadedStyles[styleKey]) {
      dispatch(loadComponentStyles({ componentName, theme: currentTheme }));
    }
  }, [dispatch, currentTheme, loadedStyles, styleKey, componentName]); */

  return (
    <nav
      data-cy="nav"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-container">
        <div className="navbar-brand">
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
              'navbar-item',
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

          <div className="theme-selector">
            <label htmlFor="theme-select">Тема сайту: </label>
            <select
              id="theme-select"
              value={useSelector((state) => state.theme.currentTheme)}
              onChange={(e) => {
                const newTheme = e.target.value as ThemeType;

                dispatch(setTheme(newTheme));
              }}
              className="theme-select"
            >
              <option value="theme0">Класична</option>
              <option value="theme1">Темна</option>
              <option value="theme2">Світла</option>
              <option value="theme3">Контрастна</option>
              <option value="theme4">Мінімалістична</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};
