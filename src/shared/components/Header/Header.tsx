import { NavMobile } from '../Header/components/NavMobile';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { navigation } from './utils/navigation';
import { getIcon } from './utils/handlesfunctions';
import { useFavorites } from '../../context/Favorites/FavoritesContext';
import { useCart } from '../../context/Cart/CartContext';
import './Header.scss';
import classNames from 'classnames';
import { Search } from './components/Search/Search';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<number>(0);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showSearchMobile, setShowSearchMobile] = useState<boolean>(false);

  const { favorites } = useFavorites();
  const { cart } = useCart();
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch !== '') {
      params.set('query', debouncedSearch);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }, [debouncedSearch]);

  const pathParts = pathname.split('/').filter(Boolean);

  const isProductDetails =
    pathParts.length === 2 &&
    ['phones', 'tablets', 'accessories'].includes(pathParts[0]);

  const isHomePage = pathname === '/';
  const isCartPage = pathname === '/cart';

  const shouldShowSearch = !isHomePage && !isProductDetails && !isCartPage;

  return (
    <header
      className={classNames('header', {
        'header-nav-mobile-isOpen': isOpen,
      })}
    >
      <section className="header-desktop">
        <Link to={"/"} 
              onClick={(e) => e.preventDefault()}
            className="header-desktop-logo-link">
          <img src="img/shared/logo.svg" alt="" />
        </Link>
        <div className="header-desktop-navigation-wrapper wrapper">
          <nav className="header-desktop-navigation grid">
            <ul
              className={classNames('header-desktop-navigation-list', {
                'header-desktop-navigation-list-search-open': showSearch,
              })}
            >
              {navigation.map(item => (
                <li key={item.id}>
                  <NavLink to={item.to} className={item.class}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <section className="header-desktop-right-side">
          <Search
            formState={showSearch}
            searchString={search}
            searchState={showSearch}
            visibilityState={!shouldShowSearch}
            onSearch={setSearch}
            onShowSearch={setShowSearch}
          />
          <NavLink
            to={'/favorites'}
            className="header-desktop-right-side-cart-link"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <img
              src={isHover ? 'img/header/fav-hover.svg' : 'img/header/fav.svg'}
              alt=""
            />
            {favorites.length > 0 && (
              <span className="notifications-counter">{favorites.length}</span>
            )}
          </NavLink>
          <NavLink to={'/cart'} className="header-desktop-right-side-cart-link">
            <img src="img/header/cart.svg" alt="" />
            {cart.length > 0 && (
              <span className="notifications-counter">{cart.length}</span>
            )}
          </NavLink>
        </section>
        <div className="mobile-right-side">
          <Search
            formState={showSearchMobile}
            searchString={search}
            searchState={showSearchMobile}
            visibilityState={!shouldShowSearch}
            onSearch={setSearch}
            onShowSearch={setShowSearchMobile}
          />
          <div className="header-desktop-mobile-menu-wrap">
            <Link
              to={"/"}
              className="header-desktop-mobile-menu-link"
              onClick={() => setIsOpen(isOpen === 0 ? 1 : 0)}
            >
              <img
                src={`${getIcon({ isOpen })}`}
                alt=""
                className="header-desktop-mobile-menu-icon"
              />
            </Link>
          </div>
        </div>
      </section>

      <NavMobile isVisible={isOpen} onVisible={setIsOpen} />
    </header>
  );
};
