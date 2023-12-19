import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import { Search } from '../Search/Search';

type Props = {
  applyQuery: (arg: string) => void;
  totalCartCount: number;
  favoritesItemsLength: number;
};

export const Header: React.FC<Props> = ({
  applyQuery,
  totalCartCount,
  favoritesItemsLength,
}) => {
  const currentPath = useLocation().pathname;
  const availableForSearch
    = ['/phones', '/tablets', '/accessories', '/favorites'];

  const setActiveClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? 'active' : '';
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar__container">
          <div className="nav-logo">
            <NavLink
              to="/"
              className={setActiveClass}
            >
              <img src="img/icons/logo.svg" alt="logo" />
            </NavLink>
          </div>
          <div className="nav-links">
            <NavLink to="/" className={setActiveClass}>Home</NavLink>
            <NavLink to="/phones" className={setActiveClass}>Phones</NavLink>
            <NavLink to="/tablets" className={setActiveClass}>Tablets</NavLink>
            <NavLink to="/accessories" className={setActiveClass}>
              Accessories
            </NavLink>
          </div>
        </div>

        <div className="nav-icons">
          {availableForSearch.includes(currentPath) && (
            <Search
              applyQuery={applyQuery}
            />
          )}

          <NavLink
            to="/favorites"
            className={setActiveClass}
          >
            <div className="favorites-icon">
              {favoritesItemsLength > 0 && (
                <div className="favorites-icon__counter">
                  <span className="favorites-icon__count">
                    {favoritesItemsLength}
                  </span>
                </div>
              )}
              <img
                src="img/icons/favourites.svg"
                alt="favorites"
                className="favorites-icon__img"
              />
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={setActiveClass}
          >
            <div className="cart-icon">
              {totalCartCount > 0 && (
                <div className="cart-icon__counter">
                  <span className="cart-icon__count">{totalCartCount}</span>
                </div>
              )}
              <img
                src="img/icons/bag.svg"
                alt="bag"
                className="cart-icon__img"
              />
            </div>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
