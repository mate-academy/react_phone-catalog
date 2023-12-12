import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import { Search } from '../Search/Search';

type Props = {
  applyQuery: (arg: string) => void;
};

export const Header: React.FC<Props> = ({
  applyQuery,
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
              to="#/"
              className={setActiveClass}
            >
              <img src="_new/img/icons/logo.svg" alt="logo" />
            </NavLink>
          </div>
          <div className="nav-links">
            <NavLink to="#/" className={setActiveClass}>Home</NavLink>
            <NavLink to="#/phones" className={setActiveClass}>Phones</NavLink>
            <NavLink to="#/tablets" className={setActiveClass}>Tablets</NavLink>
            <NavLink to="#/accessories" className={setActiveClass}>
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

          <NavLink to="#/favorites" className={setActiveClass}>
            <img
              src="_new/img/icons/favourites.svg"
              alt="favorites"
            />
          </NavLink>
          <NavLink to="#/cart" className={setActiveClass}>
            <img src="_new/img/icons/bag.svg" alt="bag" />
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
