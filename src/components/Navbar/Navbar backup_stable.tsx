import { NavLink, useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { RootState, useAppSelector } from '../../redux/store';
import { loadComponentStyles, setTheme } from '../../redux/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import './Navbar.scss';
import { emptyHeart } from '../Recommended/Recommended';
import { currentCartItems, currentCartTotalQuantity } from '../../redux/cartSlice';
import { currentFavoriteItems } from '../../redux/favoritesSlice';
import { shoppingBagIcon, crossIcon, burgerIcon, settingsIcon, searchGlass }
  from '../../../public/img/icons/svg_icons';

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
  const [topbarOpen, setTopBarOpen] = useState(false);
  const [searchbarOpen, setSearchbarOpen] = useState(false);
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

  const topbarRef = useRef<HTMLDivElement>(null);
  const searchbarRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef(null);

  const focusOnSearch = () => {
    searchInputRef.current?.focus();
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as Node;

    const clickedInSidebar = topbarRef.current?.contains(target);
    const clickOnSearchbar = searchbarRef.current?.contains(target);

    if (!clickedInSidebar) {
      setTopBarOpen(false);
    }

    if (!clickOnSearchbar) {
      setSearchbarOpen(false);
    }
  };

  useEffect(() => {
    if (searchbarOpen) {
      document.body.classList.add('searchbar-open');
      document.addEventListener('mousedown', handleDocumentClick);
    }

    return () => {
      document.body.classList.remove('searchbar-open');
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [searchbarOpen]);

  useEffect(() => {
    if (topbarOpen) {
      document.body.classList.add('topbar-open');
      document.addEventListener('mousedown', handleDocumentClick);
    }

    return () => {
      document.body.classList.remove('topbar-open');
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [topbarOpen]);

  const handleSearch = () => {
    if (query.trim()) {
      const params = new URLSearchParams({
        query: query.trim(),
        category,
        page: '1',
      });

      setSearchbarOpen(false);
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
      className={`navbar-body ${currentTheme} ${topbarOpen ? 'topbar-open' : ''}`}
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


        <div className="navbar-item navbar-links-block">
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
        </div>



  {/*         <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="books">Books</option>
            <option value="electronics">Electronics</option>
          </select> */}
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

        <div className="bottom-button desktop"
          onClick={() => {
            setSearchbarOpen(true);
            focusOnSearch();
          }}
        >
          {searchGlass}
        </div>

        <NavLink
          to="/favorites"
          className={({ isActive }) => classNames(
            'bottom-button desktop',
            { 'link-active has-background-grey-lighter': isActive },
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
            'bottom-button desktop',
            { 'link-active has-background-grey-lighter': isActive },
          )}
        >
          {shoppingBagIcon}
          <div className="cart-counter red-counter">
            {displayCartQty()}
          </div>
        </NavLink>

        <div className="bottom-button desktop settingsIcon"
          onClick={() => setTopBarOpen(true)}
        >
          {settingsIcon}
        </div>

        <div className={`navbar-sliding-settings ${topbarOpen ? 'visible' : ''}`}
          onClick={() => setTopBarOpen(false)}
          ref={topbarRef}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <LanguageSwitcher />
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <ThemeSwitcher />
          </div>
        </div>

        <div className={`navbar-searchbar ${searchbarOpen ? 'visible' : ''}`}
          ref={searchbarRef}
        >
          <div className="navbar-item navbar-search">
            <input
              ref={searchInputRef}
              type="text"
              placeholder={t('navigation.search_placeholder')}
              className='navigation-searchbar'
              value={query}
              onClick={(e) => e.stopPropagation()}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>
        </div>

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
