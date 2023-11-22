import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './Header.scss';
import { debounce } from '../../utils/debounce';
import heart from '../../icons/favorite.svg';
import bag from '../../icons/shopingBag.svg';
import { Menu } from '../Menu/Menu';
import { HeaderMobile } from '../BurgerMenu/BurgerMenu';
import { getSearchWith } from '../../utils/searchHelper';
import xButton from '../../icons/Union.svg';
import search from '../../icons/Search.svg';
import { Product } from '../../types/productType';
import { CartItem } from '../../types/cartType';

type Props = {
  favorites: Product[],
  cartItems: CartItem[]
};

export const Header: React.FC<Props> = ({ favorites, cartItems }) => {
  const [isOpen, setOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();
  const [queryState, setQueryState] = useState('');
  const currentLocation
    = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
  const isSearchVisible
    = currentLocation === 'phones'
    || currentLocation === 'tablets'
    || currentLocation === 'accessories'
    || currentLocation === 'favorites';

  const countCartItems
    = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 900) {
        setIsMobileMenu(true);
      } else {
        setIsMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const applyQuery = debounce(setSearchParams, 1000);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryState(event.target.value);
    // eslint-disable-next-line max-len
    applyQuery(getSearchWith(searchParams, { query: event.target.value || null }));
  };

  const handleClearClick = () => {
    setQueryState('');
    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <header className="header">
      <div className="header__content">
        <nav
          data-cy="nav"
          className="nav"
          role="navigation"
          aria-label="main navigation"
        >
          {isMobileMenu
            ? (
              <HeaderMobile
                isOpen={isOpen}
                handleIsOpen={handleIsOpen}
                setOpen={setOpen}
              />
            )
            : <Menu />}

        </nav>

        <div className="header__actions">
          {isSearchVisible && (
            <div className="header__search">
              <input
                data-cy="NameFilter"
                type="search"
                className="header__search-input"
                placeholder={`Search in ${currentLocation}...`}
                value={queryState}
                onChange={handleQueryChange}
              />
              <button
                type="button"
                className="header__search-icon"
                aria-label="Clear search"
                onClick={handleClearClick}
                disabled={!query?.length}
                style={!query?.length
                  ? { cursor: 'default' }
                  : { cursor: 'pointer' }}
              >
                {query?.length
                  ? <img src={xButton.toString()} alt="reset" />
                  : (
                    <img
                      src={search.toString()}
                      alt="search"
                    />
                  )}
              </button>
            </div>
          )}
          {currentLocation !== 'cart' && (
            <NavLink
              className={({ isActive }) => classNames(
                'favorites-card-buttons__link', {
                  'favorites-card-buttons__link--active': isActive,
                },
              )}
              to="/favorites"
            >
              <img
                className="favorites-card-buttons__icon icon"
                src={heart.toString()}
                alt="Favorites"
              />
              {favorites.length > 0 && (
                <span className="icon__count">
                  {favorites.length}
                </span>
              )}
            </NavLink>
          )}
          <NavLink
            className={({ isActive }) => classNames(
              'favorites-card-buttons__link', {
                'favorites-card-buttons__link--active': isActive,
              },
            )}
            to="/cart"
          >
            <img
              className="favorites-card-buttons__icon icon--cart"
              src={bag.toString()}
              alt="Shopping bag"
            />
            {countCartItems > 0 && (
              <span className="icon__count">
                {countCartItems}
              </span>
            )}
          </NavLink>
        </div>
      </div>

    </header>
  );
};
