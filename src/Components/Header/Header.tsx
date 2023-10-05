import './Header.scss';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { HeaderSearch } from './HeaderSearch';
import HeartImage from './HeaderImage/heart.svg';
import BasketImage from './HeaderImage/basket.svg';
import LogoImage from './HeaderImage/LOGO.svg';
import { useFavoriteContext }
  from '../../core/context/FavoriteContext/FavoriteContext';

interface HeaderProps {
  searchValue: string;
  setSearchValue: (search: string) => void;
}

const ROUTES_CONFIG = [
  { path: '/', label: 'Home' },
  { path: '/phones', label: 'Phones' },
  { path: '/tablets', label: 'Tablets' },
  { path: '/accessories', label: 'Accessories' },
];

export const Header = ({ searchValue, setSearchValue }: HeaderProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const contacts = location.pathname === '/contacts';
  const rights = location.pathname === '/rights';
  const phone = location.pathname === '/phones';
  const tablets = location.pathname === '/tablets';
  const accessories = location.pathname === '/accessories';
  const basket = location.pathname === '/cart';
  const favorite = location.pathname === '/favorites';

  let search = '';

  if (!isHomePage && !contacts && !rights && !favorite && !basket) {
    switch (true) {
      case phone:
        search = 'Search in phones...';
        break;
      case tablets:
        search = 'Search in tablets...';
        break;
      case accessories:
        search = 'Search in accessories...';
        break;
      default:
        break;
    }
  }

  const { favoritesLength, basketLength } = useFavoriteContext();

  return (
    <header className="header">
      <div className={cn('header__FirstChild', { 'is-home-page': isHomePage })}>
        <div className="header__FirstChild-logo">
          <NavLink to="/" className="logoLink">
            <img
              className={cn('logoImage', { 'is-home-page': isHomePage })}
              src={LogoImage}
              alt="Logo"
            />
          </NavLink>
        </div>
        <nav
          data-cy="categoryLinksContainer"
          className="header__FirstChild-nav"
        >
          <ul className="header__FirstChild-nav-list">
            {ROUTES_CONFIG.map(el => (
              <li className="header__FirstChild-nav-item">
                <NavLink
                  to={el.path}
                  className={({ isActive }) => cn(
                    'header__FirstChild-nav-link', { 'is-active': isActive },
                  )}
                >
                  {el.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="header__LastChild">
        {search
          && (
            <HeaderSearch
              search={search}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          )}

        <div className={cn('header__LastChild-heart',
          { 'is-activ': favorite })}
        >
          <NavLink to="/favorites" className="heartLink">
            <img className={`heart-svg ${isHomePage ? 'is-home-page' : ''}`} src={HeartImage} alt="heart" />
          </NavLink>

          {favoritesLength >= 1
            && (
              <div className="circle-for-header">
                <p className="counter-for-header">{favoritesLength}</p>
              </div>
            )}

        </div>
        <div className={cn('header__LastChild-basket',
          { 'is-activ': basket })}
        >
          <NavLink to="/cart" className="basketLink">
            <img className="basket-svg" src={BasketImage} alt="basket" />
          </NavLink>

          {basketLength >= 1
            && (
              <div className="circle-for-header">
                <p className="counter-for-header">{basketLength}</p>
              </div>
            )}
        </div>
      </div>
    </header>
  );
};
