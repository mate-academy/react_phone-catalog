import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) => cn('nav__link',
  {
    'nav__link--is-active': isActive,
  });

export const Navigation = () => {
  const location = useLocation();
  const phonesPageIsActive = location.pathname === '/phones';

  return (
    <nav className="nav header__nav">

      <div className="nav__links">
        <NavLink
          className={getLinkClass}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={getLinkClass}
          to="/phones"
        >
          Phones
        </NavLink>

        <NavLink
          className={getLinkClass}
          to="/tablets"
        >
          Tablets
        </NavLink>

        <NavLink
          className={getLinkClass}
          to="/accessories"
        >
          Accessories
        </NavLink>
      </div>

      <div className="nav__favorite">
        {phonesPageIsActive && (
          <div className="nav__search">
            <input
              className="nav__search-placeholder"
              type="text"
              placeholder="Search in phones..."
              name=""
              id=""
            />

            <img
              className="nav__search-icon"
              src="new/img/icons/search.svg"
              alt="search-icon"
            />
          </div>
        )}

        <NavLink
          className={({ isActive }) => cn('nav__favorites', {
            'nav__favorites--is-active': isActive,
          })}
          to="/favorites"
        >
          <img src="new/img/icons/favorites.svg" alt="favorites" />
        </NavLink>

        <NavLink
          className={({ isActive }) => cn('nav__cart', {
            'nav__cart--is-active': isActive,
          })}
          to="/cart"
        >
          <img src="new/img/icons/cart.svg" alt="cart" />
        </NavLink>
      </div>
    </nav>
  );
};
