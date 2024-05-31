import { Link, NavLink } from 'react-router-dom';
import './HeaderLarge.scss';
import '../../styles/main.scss';
import classNames from 'classnames';

export const HeaderLarge: React.FC = () => {
  return (
    <header className="header-large" id="header">
      <Link to="/" className="header-large__logo">
        <img src="./icons/logo.svg" alt="logo" />
      </Link>

      <div className="header-large__categories">
        <NavLink
          className={({ isActive }) =>
            classNames('header-large__category-link', 'uppercase', {
              'header-large__category-link--active': isActive,
            })
          }
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            classNames('header-large__category-link', 'uppercase', {
              'header-large__category-link--active': isActive,
            })
          }
          to="/phones"
        >
          Phones
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            classNames('header-large__category-link', 'uppercase', {
              'header-large__category-link--active': isActive,
            })
          }
          to="tablets"
        >
          Tablets
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            classNames('header-large__category-link', 'uppercase', {
              'header-large__category-link--active': isActive,
            })
          }
          to="accessories"
        >
          Accessories
        </NavLink>
      </div>

      <div className="header-large__user-products">
        <Link
          to="/favorites"
          className="header-large__selection-link default-button"
        >
          <img src="./icons/heart-black.svg" alt="heart icon" />
        </Link>
        <Link
          to="/cart"
          className="header-large__selection-link default-button"
        >
          <img src="./icons/cart.svg" alt="cart icon" />
        </Link>
      </div>

      {/* <div onClick={showMenu} className="header-nav__item header-nav__burger">
          <img src="./icons/burger.svg" alt="Open menu button" />
        </div> */}
    </header>
  );
};

export default HeaderLarge;
