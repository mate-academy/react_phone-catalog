import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './HeaderLarge.scss';
import '../../styles/main.scss';

export const HeaderLarge: React.FC = () => {
  return (
    <header className="header-large" id="header">
      <div className="header-left header-large__left">
        <Link to="/" className="header-left__logo">
          <img src="./icons/logo.svg" alt="logo" />
        </Link>

        <div className="header-left__categories">
          <NavLink
            className={({ isActive }) =>
              classNames('header-left__category-link', 'uppercase', {
                'header-left__category-link--active': isActive,
              })
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              classNames('header-left__category-link', 'uppercase', {
                'header-left__category-link--active': isActive,
              })
            }
            to="/phones"
          >
            Phones
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              classNames('header-left__category-link', 'uppercase', {
                'header-left__category-link--active': isActive,
              })
            }
            to="tablets"
          >
            Tablets
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              classNames('header-left__category-link', 'uppercase', {
                'header-left__category-link--active': isActive,
              })
            }
            to="accessories"
          >
            Accessories
          </NavLink>
        </div>
      </div>

      <div className="header-large__user-products">
        <Link
          to="/favorites"
          className={classNames(
            'header-large__selection-link',
            'header-large__selection-link--favorites',
            'default-button',
          )}
        ></Link>
        <Link
          to="/cart"
          className={classNames(
            'header-large__selection-link',
            'header-large__selection-link--cart',
            'default-button',
          )}
        >
          <img
            className="header-large__cart-icon"
            src="./icons/cart.svg"
            alt="cart icon"
          />
        </Link>
      </div>

      {/* <div onClick={showMenu} className="header-nav__item header-nav__burger">
          <img src="./icons/burger.svg" alt="Open menu button" />
        </div> */}
    </header>
  );
};

export default HeaderLarge;
