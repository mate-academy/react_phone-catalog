import { NavLink } from 'react-router-dom';
import './Menu.scss';
import classNames from 'classnames';

export const Menu = () => {
  return (
    <section className="menu">
      <nav className="nav">
        <ul className="nav__list">
          <li>
            <NavLink className="nav__list-item" to="/">
              home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__list-item" to="phones">
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__list-item" to="tablets">
              tablets
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__list-item" to="accessories">
              accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <nav className="nav-bottom">
        <ul className="nav-bottom__list">
          <li>
            <NavLink
              className={({ isActive }) =>
                classNames('nav-bottom__list-item', {
                  'nav-bottom-item-active': isActive,
                })
              }
              to="/favourites"
            >
              <img
                className="top-bar__nav-secondary-img"
                src="../../icons/favourites-icon.svg"
                alt="Icon favourites"
              />
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                classNames('nav-bottom__list-item', {
                  'nav-bottom-item-active': isActive,
                })
              }
              to="/cart"
            >
              <img
                className="top-bar__nav-secondary-img"
                src="../../icons/cart-icon.svg"
                alt="Icon favourites"
              />
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};
