import {
  useContext,
  useState,
  useEffect,
  useMemo,
  FC,
  useCallback,
  ChangeEvent,
} from 'react';

import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { GlobalContext } from '../../../context/GlobalContext';
import { icons } from '../../../constants/icons.config';
import { Icon } from '../Icon';
import { navLinks } from '../../../constants/navLinks';
import debounce from 'lodash/debounce';
import { getSearchWith } from '../../../utils/searchHelper';
import './Header.scss';

const SEARCH_PLACEHOLDER = 'Search...';
const SEARCH_DEBOUNCE_DELAY = 500;
const SEARCHABLE_PATHS = ['/phones', '/tablets', '/accessories', '/favorites'];

const getNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
  classNames('header__item', { 'header__item--active': isActive });

const getIconClasses = ({ isActive }: { isActive: boolean }) =>
  classNames('header__icon', { 'header__icon--active': isActive });

export const Header: FC = () => {
  const { cart, favorites, toggleMenu, isMenuOpen, theme, toggleTheme } =
    useContext(GlobalContext);

  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPlaceholder, setSearchPlaceholder] =
    useState(SEARCH_PLACEHOLDER);

  const cartItemCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const shouldShowSearch = useMemo(
    () => SEARCHABLE_PATHS.includes(location.pathname),
    [location.pathname],
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchParams(currentParams =>
          getSearchWith(currentParams, { query }),
        );
      }, SEARCH_DEBOUNCE_DELAY),
    [setSearchParams],
  );

  const logoSrc = theme === 'light' ? 'logo.svg' : 'logo_dark.svg';
  const themeButtonText = theme === 'light' ? 'Dark' : 'Light';

  useEffect(() => {
    setSearchQuery('');
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value;
      const trimmedQuery = newQuery.trim();

      setSearchQuery(newQuery);

      if (trimmedQuery) {
        debouncedSearch(newQuery);
      } else {
        debouncedSearch.cancel();
        setSearchParams(params => {
          const newParams = new URLSearchParams(params);

          newParams.delete('query');

          return newParams;
        });
      }
    },
    [debouncedSearch, setSearchParams],
  );

  const handleSearchFocus = useCallback(() => {
    setSearchPlaceholder('');
  }, []);

  const handleSearchBlur = useCallback(() => {
    setSearchPlaceholder(SEARCH_PLACEHOLDER);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    debouncedSearch.cancel();
    setSearchParams(params => {
      const newParams = new URLSearchParams(params);

      newParams.delete('query');

      return newParams;
    });
  }, [debouncedSearch, setSearchParams]);

  const handleMenuToggle = useCallback(() => {
    if (isMenuOpen) {
      toggleMenu();
    }
  }, [isMenuOpen, toggleMenu]);

  const renderSearchInput = () => (
    <div className="header__search-wrapper">
      <input
        type="text"
        placeholder={searchPlaceholder}
        className="header__search-input"
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
      />
      {searchQuery ? (
        <button
          type="button"
          className="header__clear-button"
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <Icon icon={icons.close[theme]} />
        </button>
      ) : (
        <Icon icon={icons.search[theme]} />
      )}
    </div>
  );

  const renderNavigationLinks = () => (
    <div className="header__list">
      {navLinks.map(link => (
        <NavLink to={link.path} key={link.title} className={getNavLinkClasses}>
          {link.title}
        </NavLink>
      ))}
    </div>
  );

  const renderActionButtons = () => (
    <div
      className={classNames('header__buttons-wrapper', {
        'header__buttons-wrapper--bottom': isMenuOpen,
      })}
      onClick={handleMenuToggle}
    >
      <NavLink className={getIconClasses} to="/favorites">
        <div className="header__icon-wrapper">
          {favorites.length > 0 && (
            <span className="header__quantity">{favorites.length}</span>
          )}
          <Icon icon={icons.favorites[theme]} />
        </div>
      </NavLink>

      <NavLink className={getIconClasses} to="/cart">
        <div className="header__icon-wrapper">
          <Icon icon={icons.shopping_cart[theme]} />
          {cartItemCount > 0 && (
            <span className="header__quantity">{cartItemCount}</span>
          )}
        </div>
      </NavLink>
    </div>
  );

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo-container">
          <img src={logoSrc} alt="Nice Gadgets" className="header__logo" />
        </Link>

        <nav className="header__menu">{renderNavigationLinks()}</nav>

        <div className="header__buttons-right">
          {shouldShowSearch && renderSearchInput()}

          <button
            type="button"
            className="header__icon header__icon--menu"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon icon={isMenuOpen ? icons.close[theme] : icons.menu[theme]} />
          </button>

          <button
            type="button"
            className="header__icon header__switch-theme"
            onClick={toggleTheme}
            aria-label={`Switch to ${themeButtonText.toLowerCase()} theme`}
          >
            {themeButtonText}
          </button>

          {renderActionButtons()}
        </div>
      </div>
    </header>
  );
};
