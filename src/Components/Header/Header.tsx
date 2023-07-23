import './Header.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { HeaderSearch } from './HeaderSearch';
import HeartImage from './HeaderImage/heart.svg';
import BasketImage from './HeaderImage/basket.svg';
import LogoImage from './HeaderImage/LOGO.svg';
import { useFavoriteContext } from '../../FavoriteContext';

interface HeaderProps {
  searchValue: string;
  setSearchValue: (search: string) => void;
}

export const Header = ({ searchValue, setSearchValue }: HeaderProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const contacts = location.pathname === '/contacts';
  const rights = location.pathname === '/rights';
  const phone = location.pathname === '/phones';
  const tablets = location.pathname === '/tablets';
  const accessories = location.pathname === '/accessories';
  const basket = location.pathname === '/basket';
  const favorite = location.pathname === '/favorite';
  // const [showSearch, setShowSearch] = useState(!isHomePage);

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
      <div className={`header__FirstChild ${isHomePage ? 'is-home-page' : ''}`}>
        <div className="header__FirstChild-logo">
          <NavLink to="/" className="logoLink">
            <img className={`logoImage ${isHomePage ? 'is-home-page' : ''}`} src={LogoImage} alt="Logo" />
          </NavLink>
        </div>
        <nav className="header__FirstChild-nav">
          <ul className="header__FirstChild-nav-list">
            <li className="header__FirstChild-nav-item">
              <NavLink to="/" className={`header__FirstChild-nav-link ${isHomePage ? 'is-active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li className="header__FirstChild-nav-item">
              <NavLink
                to="/phones"
                className={({ isActive }) => {
                  return `header__FirstChild-nav-link ${isActive ? 'is-active' : ''}`;
                }}
              >
                Phones
              </NavLink>
            </li>
            <li className="header__FirstChild-nav-item">
              <NavLink
                to="/tablets"
                className={`header__FirstChild-nav-link ${location.pathname === '/tablets' ? 'is-active' : ''}`}
              >
                Tablets
              </NavLink>
            </li>
            <li className="header__FirstChild-nav-item">
              <NavLink
                to="/accessories"
                className={`header__FirstChild-nav-link ${location.pathname === '/accessories' ? 'is-active' : ''}`}
              >
                Accessories
              </NavLink>
            </li>
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

        <div className={`header__LastChild-heart ${location.pathname === '/favorite' ? 'is-activ' : ''}`}>
          <NavLink to="/favorite" className="heartLink">
            <img className={`heart-svg ${isHomePage ? 'is-home-page' : ''}`} src={HeartImage} alt="heart" />
          </NavLink>

          {favoritesLength >= 1
              && (
                <div className="circle-for-header">
                  <p className="counter-for-header">{favoritesLength}</p>
                </div>
              )}

        </div>
        <div className={`header__LastChild-basket ${location.pathname === '/basket' ? 'is-activ' : ''}`}>
          <NavLink to="/basket" className="basketLink">
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
