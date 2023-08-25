/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, NavLink, useLocation } from 'react-router-dom';
import classnames from 'classnames';

interface NavLinkIsActive {
  isActive: boolean;
}

interface HeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  currentProduct: string;
}

const navLinkClassName = ({ isActive }: NavLinkIsActive) => {
  return (
    classnames('nav__link', { 'is-active': isActive })
  );
};

const shoppingIconClassName = ({ isActive }: NavLinkIsActive) => {
  return `shopping-icon${classnames({ '--is-active': isActive })}`;
};

const Header: React.FC<HeaderProps> = ({ setSearchQuery, currentProduct }) => {
  const location = useLocation();

  const isShoppingCartActive = () => {
    if (location.pathname.includes('shopping-cart')) {
      return { visibility: 'hidden' };
    }

    return { visibility: 'visible' };
  };

  const isSearchVisible = () => {
    const isCatalogOnThePage = location.pathname === '/phones'
    || location.pathname === '/tablets'
    || location.pathname === '/accessories'
    || location.pathname === '/favorites';

    if (isCatalogOnThePage) {
      return { visibility: 'visible' };
    }

    return { visibility: 'hidden' };
  };

  return (
    <header className="header">
      <Link to="/" className="header__home-link home-link" />

      <div className="header__wrapper">
        <nav className="header__nav nav" style={isShoppingCartActive() as React.CSSProperties}>
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                className={({ isActive }) => navLinkClassName({ isActive })}
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                className={({ isActive }) => navLinkClassName({ isActive })}
                to="/phones"
              >
                Phones
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                className={({ isActive }) => navLinkClassName({ isActive })}
                to="/tablets"
              >
                Tablets
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                className={({ isActive }) => navLinkClassName({ isActive })}
                to="/accessories"
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <section className="header__header-bar">
          <form
            className="header__search"
            onSubmit={(event) => event.preventDefault()}
            style={isSearchVisible() as React.CSSProperties}
          >
            <input
              type="search"
              placeholder={`Search in ${currentProduct}...`}
              className="header__search--bar"
              onChange={event => setSearchQuery(event.target.value)}
            />
            <button
              type="submit"
              className="header__search--button"
              // onClick={() => console.log('hello world')}
            />
          </form>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `header__favorites ${shoppingIconClassName({ isActive })}`}
            style={isShoppingCartActive() as React.CSSProperties}
          />
          <NavLink
            to="/shopping-cart"
            className={({ isActive }) => `header__shopping-cart ${shoppingIconClassName({ isActive })}`}
          />
        </section>
      </div>
    </header>
  );
};

export default Header;
