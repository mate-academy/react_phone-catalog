import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import { SearchBar } from '../SearchBar';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('nav__link', { 'nav__link--active': isActive });

const getBtnClass = ({ isActive }: { isActive: boolean }) =>
  classNames(`nav__buttons-btn`, {
    'nav__buttons-btn--active': isActive,
  });

type Props = {
  className?: string;
};

export const Nav: React.FC<Props> = ({ className = '' }) => {
  const { cartItems, favItems } = useContext(AppContext);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || 'dark',
  );
  const location = useLocation();

  const isCatalogPage =
    location.pathname.includes('/phones') ||
    location.pathname.includes('/tablets') ||
    location.pathname.includes('/accessories');

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      localStorage.getItem('theme') || 'dark',
    );
  }, []);

  const handleThemeSwitch = () => {
    const currentTheme =
      document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <nav className={`nav ${className}`.trim()}>
      {!isSearchBarOpen && (
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink className={getLinkClass} to="/">
              home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className={getLinkClass} to="/phones">
              Phones
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className={getLinkClass} to="/tablets">
              tablets
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className={getLinkClass} to="/accessories">
              accessories
            </NavLink>
          </li>
        </ul>
      )}

      <ul className="nav__buttons">
        {isCatalogPage && (
          <SearchBar className="nav__search-bar nav__search-bar--desktop" />
        )}

        {isCatalogPage && (
          <>
            {isSearchBarOpen && <SearchBar className="nav__search-bar" />}

            <li className="nav__buttons-item nav__buttons-item--search">
              <button
                className={classNames(
                  `nav__buttons-btn nav__buttons-btn--search`,
                  {
                    'nav__buttons-btn--active': isSearchBarOpen,
                  },
                )}
                type="button"
                onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
              >
                <span className="sr-only">Open search bar</span>
                <Icon iconName="icon-search" />
              </button>
            </li>
          </>
        )}
        <li className="nav__buttons-item">
          <button
            className={classNames(`nav__buttons-btn nav__buttons-btn--theme`, {
              'nav__buttons-btn--theme--active': theme === 'light',
            })}
            type="button"
            onClick={handleThemeSwitch}
          >
            <span className="sr-only">Switch color theme</span>
            <Icon iconName="icon-bulb" />
          </button>
        </li>
        <li className="nav__buttons-item">
          <NavLink className={getBtnClass} to="/favorites">
            <span className="sr-only">Open favorites</span>
            {favItems.length > 0 && (
              <span className="nav__buttons-quantity">{favItems.length}</span>
            )}
            <Icon iconName="icon-heart" />
          </NavLink>
        </li>
        <li className="nav__buttons-item">
          <NavLink className={getBtnClass} to="/cart">
            <span className="sr-only">Open cart</span>
            {cartItems.reduce((total, item) => total + item.quantity, 0) >
              0 && (
              <span className="nav__buttons-quantity">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
            <Icon iconName="icon-cart" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
