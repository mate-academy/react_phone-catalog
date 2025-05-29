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
import { emptyHeart } from '../Recommended/Recommended';
import { currentCartItems, currentCartTotalQuantity } from '../../redux/cartSlice';
import { currentFavoriteItems } from '../../redux/favoritesSlice';


type ThemeType = 'theme0' | 'theme1' | 'theme2' | 'theme3' | 'theme4';

export const burgerIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4.5C1 4.08579 1.39175 3.75 1.875 3.75H14.125C14.6082 3.75 15 4.08579 15 4.5C15 4.91421 14.6082 5.25 14.125 5.25H1.875C1.39175 5.25 1 4.91421 1 4.5Z" fill="#313237"/>
    <path d="M1 8C1 7.58579 1.39175 7.25 1.875 7.25H14.125C14.6082 7.25 15 7.58579 15 8C15 8.41421 14.6082 8.75 14.125 8.75H1.875C1.39175 8.75 1 8.41421 1 8Z" fill="#313237"/>
    <path d="M1.875 10.75C1.39175 10.75 1 11.0858 1 11.5C1 11.9142 1.39175 12.25 1.875 12.25H14.125C14.6082 12.25 15 11.9142 15 11.5C15 11.0858 14.6082 10.75 14.125 10.75H1.875Z" fill="#313237"/>
  </svg>
);

export const crossIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894 12.4716 3.52859C12.2112 3.26824 11.7891 3.26824 11.5288 3.52859L8.00016 7.05719L4.47157 3.52859C4.21122 3.26824 3.78911 3.26824 3.52876 3.52859C3.26841 3.78894 3.26841 4.21105 3.52876 4.4714L7.05735 7.99999L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.9428L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99999L12.4716 4.4714Z" fill="#313237"/>
  </svg>
);

export const shoppingBagIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46683 0.933323C3.59273 0.765453 3.79032 0.666656 4.00016 0.666656H12.0002C12.21 0.666656 12.4076 0.765453 12.5335 0.933323L14.5335 3.59999C14.62 3.71539 14.6668 3.85574 14.6668 3.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V3.99999C1.3335 3.85574 1.38028 3.71539 1.46683 3.59999L3.46683 0.933323ZM4.3335 1.99999L2.66683 4.22221V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V4.22221L11.6668 1.99999H4.3335Z" fill="#313237"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.3335 4.00001C1.3335 3.63182 1.63197 3.33334 2.00016 3.33334H14.0002C14.3684 3.33334 14.6668 3.63182 14.6668 4.00001C14.6668 4.3682 14.3684 4.66668 14.0002 4.66668H2.00016C1.63197 4.66668 1.3335 4.3682 1.3335 4.00001Z" fill="#313237"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33366 6C5.70185 6 6.00033 6.29848 6.00033 6.66667C6.00033 7.1971 6.21104 7.70581 6.58611 8.08088C6.96118 8.45595 7.46989 8.66667 8.00033 8.66667C8.53076 8.66667 9.03947 8.45595 9.41454 8.08088C9.78961 7.70581 10.0003 7.1971 10.0003 6.66667C10.0003 6.29848 10.2988 6 10.667 6C11.0352 6 11.3337 6.29848 11.3337 6.66667C11.3337 7.55072 10.9825 8.39857 10.3573 9.02369C9.73223 9.64881 8.88438 10 8.00033 10C7.11627 10 6.26842 9.64881 5.6433 9.02369C5.01818 8.39857 4.66699 7.55072 4.66699 6.66667C4.66699 6.29848 4.96547 6 5.33366 6Z" fill="#313237"/>
  </svg>
);

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

  const cartQty = useAppSelector(currentCartTotalQuantity);
  const displayCartQty = () => cartQty > 99 ? '99+' : cartQty;

  const favItems = useAppSelector(currentFavoriteItems);

  const favQty = () => {
    return (favItems.length > 99 ? '99+' : `${favItems.length}`);
  };

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
    if (e.key === 'Enter' && query.length >= 3) {
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
      >
        <NavLink
          to='/'
        >
          <img src="../../../public/img/icons/iSupply_logo.png" alt="" />
        </NavLink>
        <div className="navbar-burger-icon"
          onClick={() => setSidebarOpen(true)}
        >
          {burgerIcon}
        </div>
      </div>
      <div className={`navbar-container ${currentTheme} ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      >
        <NavLink
          to="/"
          className={() => classNames(
            'navbar-item', 'navbar-logo',
          )}
        >
          <img src="../../../public/img/icons/iSupply_logo.png" alt="" />
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

{/*         <NavLink
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
        </NavLink> */}

        <div onClick={(e) => e.stopPropagation()}>
          <LanguageSwitcher />
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <ThemeSwitcher />
        </div>
        <NavLink
          to="/favorites"
          className={({ isActive }) => classNames(
            'bottom-button',
            { 'link-active': isActive },
          )}
        >
          {emptyHeart}
          <div className="fav-counter red-counter">
            {favQty()}
          </div>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => classNames(
            'bottom-button',
            { 'link-active': isActive },
          )}
        >
          {shoppingBagIcon}
          <div className="cart-counter red-counter">
            {displayCartQty()}
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

const MobileNavbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();
  const currentTheme = useAppSelector(
    (state: { theme: { current: string }; }) => state.theme.current);

  const { t } = useTranslation();

  const cartQty = useAppSelector(currentCartTotalQuantity);
  const displayCartQty = () => cartQty > 99 ? '99+' : cartQty;

  const favItems = useAppSelector(currentFavoriteItems);
  const favQty = () => {
    return (favItems.length > 99 ? '99+' : `${favItems.length}`);
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('sidebar-open');
    }

    return () => document.body.classList.remove('sidebar-open');
  }, [sidebarOpen]);

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
      className={`navbar-body ${currentTheme} ${sidebarOpen ? 'sidebar-open' : ''}`}
    >
      <div className="navbar-burger"
      >
        <NavLink
          to='/'
        >
          <img src="../../../public/img/icons/iSupply_logo.png" alt="" />
        </NavLink>
        <div className="navbar-burger-icon"
          onClick={() => setSidebarOpen(true)}
        >
          {burgerIcon}
        </div>
      </div>

      <div className={`navbar-container ${currentTheme} ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="navbar-burger navbar-burger-mobile"
        >
          <NavLink
            to='/'
          >
            <img src="../../../public/img/icons/iSupply_logo.png" alt="" />
          </NavLink>
          <div className="navbar-burger-icon"
            onClick={() => setSidebarOpen(true)}
          >
            {crossIcon}
          </div>
        </div>


        <NavLink
          to="/"
          className={({ isActive }) => classNames(
            'navbar-item navbar-item-mobile',
            { 'link-active': isActive },
          )}
        >
          {t('navigation.home')}
        </NavLink>

        <NavLink
          to="/phones"
          className={({ isActive }) => classNames(
            'navbar-item navbar-item-mobile',
            { 'link-active': isActive },
          )}
        >
          {t('navigation.phones')}
        </NavLink>

        <NavLink
          to="/tablets"
          className={({ isActive }) => classNames(
            'navbar-item navbar-tablets navbar-item-mobile',
            { 'link-active': isActive },
          )}
        >
          {t('navigation.tablets')}
        </NavLink>

        <NavLink
          to="/accessories"
          className={({ isActive }) => classNames(
            'navbar-item navbar-item-mobile',
            { 'link-active': isActive },
          )}
        >
          {t('navigation.accessories')}
        </NavLink>

        <div className="navbar-item navbar-search navbar-item-mobile">
          <input
            type="text"
            placeholder={t('navigation.search_placeholder')}
            className='navigation-searchbar '
            value={query}
            onClick={(e) => e.stopPropagation()}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className='navbar-item-mobile'>
          <LanguageSwitcher />
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className='navbar-item-mobile'
        >
          <ThemeSwitcher />
        </div>
        <div className="navbar-footer">
          <NavLink
            to="/favorites"
            className={({ isActive }) => classNames(
              'bottom-button',
              { 'link-active': isActive },
            )}
          >
            {emptyHeart}
            <div className="fav-counter red-counter">
              {favQty()}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => classNames(
              'bottom-button',
              { 'link-active': isActive },
            )}
          >
            {shoppingBagIcon}
            <div className="cart-counter red-counter">
              {displayCartQty()}
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export const Navbar: React.FC = () => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 640;

  return isMobile ? (
    <MobileNavbar />
  ) : (
    <FullNavbar /> // that is the trick to use completely
  ); // different menu, with dif layout
};
