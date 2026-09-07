import './Header.scss';
import classNames from 'classnames';
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
import { GlobalContext } from '../../../context/GlobalContext';
import { icons } from '../../../constants/iconsObject';
import { Icon } from '../Icon';
import { navLinks } from '../../../constants/navLinks';
import debounce from 'lodash/debounce';
import { getSearchWith } from '../../../utils/searchHelper';

const getActiveItem = ({ isActive }: { isActive: boolean }) =>
  classNames('header__item', { 'header__item--active': isActive });

const getActiveIcon = ({ isActive }: { isActive: boolean }) =>
  classNames('header__icon', { 'header__icon--active': isActive });

export const Header: FC = () => {
  const { cart, favorites, toggleMenu, isMenuOpen, theme, toggleTheme } =
    useContext(GlobalContext);

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const isShowSearch = useMemo(
    () =>
      ['/phones', '/tablets', '/accessories', '/favorites'].includes(
        location.pathname,
      ),
    [location.pathname],
  );

  const applyQuery = useMemo(
    () =>
      debounce((value: string) => {
        setSearchParams(() => getSearchWith(searchParams, { query: value }));
      }, 500),
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    setQuery('');
  }, [location.pathname]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value.trim();

      setQuery(event.target.value);

      if (newQuery.length > 0) {
        applyQuery(event.target.value);
      } else {
        setSearchParams(prevParams => {
          const newParams = new URLSearchParams(prevParams);

          newParams.delete('query');

          return newParams;
        });
      }
    },
    [applyQuery, setSearchParams],
  );

  const clearInput = useCallback(() => {
    setQuery('');
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.delete('query');

      return newParams;
    });
  }, [setSearchParams]);

  return (
    <div className="header">
      <Link to="/" className="header__logo-container">
        <img
          src={theme === 'light' ? 'logo.svg' : 'logo_dark.svg'}
          alt="Nice Gadgets"
          className="header__logo"
        />
      </Link>

      <div className="header__menu">
        <div className="header__list">
          {navLinks.map(link => (
            <NavLink to={link.path} key={link.title} className={getActiveItem}>
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="header__buttons-right">
        {isShowSearch && (
          <div className="header__search-wrapper">
            <input
              type="text"
              placeholder="Search product..."
              className="header__search-input"
              value={query}
              onChange={handleInputChange}
            />
            {query ? (
              <div className="header__clear-button" onClick={clearInput}>
                <Icon icon={icons.close[theme]} />
              </div>
            ) : (
              <Icon icon={icons.search[theme]} />
            )}
          </div>
        )}

        <div onClick={toggleMenu} className="header__icon header__icon--menu">
          <Icon icon={isMenuOpen ? icons.close[theme] : icons.menu[theme]} />
        </div>

        <button
          className="header__icon header__switch-theme"
          onClick={toggleTheme}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>

        <div
          className={classNames('header__buttons-wrapper', {
            'header__buttons-wrapper--bottom': isMenuOpen,
          })}
          onClick={() => {
            if (isMenuOpen) {
              toggleMenu();
            }
          }}
        >
          <NavLink className={getActiveIcon} to="/favorites">
            <div className="header__icon-wrapper">
              {favorites.length ? (
                <span className="header__quantity">{favorites.length}</span>
              ) : null}

              <Icon icon={icons.favorites[theme]} />
            </div>
          </NavLink>

          <NavLink className={getActiveIcon} to="/cart">
            <div className="header__icon-wrapper">
              <Icon icon={icons.shopping_cart[theme]} />

              {totalQuantity > 0 && (
                <span className="header__quantity">{totalQuantity}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
