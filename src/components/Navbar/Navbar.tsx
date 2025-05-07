import { NavLink, useNavigate } from 'react-router-dom';
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
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();
  const currentTheme = useAppSelector(
    (state: { theme: { current: string }; }) => state.theme.current);

  const { t } = useTranslation();

  const handleSearch = () => {
    if (query.trim()) {
      const params = new URLSearchParams({
        query: query.trim(),
        category,
        page: '1',
      });

      navigate(`/search?${params.toString()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.length > 3) {
      handleSearch();
    }
  };

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

        <div className="navbar-item navbar-search">
          <input
            type="text"
            placeholder={t('navigation.search_placeholder')}
            className='navigation-searchbar'
            value={query}
            onClick={(e) => e.stopPropagation()}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
  {/*         <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="books">Books</option>
            <option value="electronics">Electronics</option>
          </select> */}
          <button onClick={handleSearch}>🔍</button>
        </div>

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
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 640;

  return isMobile ? (
    <FullNavbar />
  ) : (
    <FullNavbar /> // that is the trick to use completely
  ); // different slider if you want, with dif layout
};
