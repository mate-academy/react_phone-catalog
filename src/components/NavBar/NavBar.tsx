import { Link, NavLink } from 'react-router-dom';
import './NavBar.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductContext';

export const NavBar = () => {
  const { favoritesProducts, addedCartProducts } = useContext(ProductsContext);

  const sumOfCounters = addedCartProducts.reduce((acc, value) => {
    return acc + value.quantity;
  }, 0);

  return (
    <nav className="nav">
      <div className="nav__right">
        <Link to="/">
          <img className="nav__logo" src="logo/logo.svg" alt="logo" />
        </Link>
        <div className="nav__links">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav__active-link' : 'nav__link'
            }
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav__active-link' : 'nav__link'
            }
            to="/phones"
          >
            PHONE
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav__active-link' : 'nav__link'
            }
            to="/tablets"
          >
            TABLETS
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav__active-link' : 'nav__link'
            }
            to="/accessories"
          >
            ACCESSORIES
          </NavLink>
        </div>
      </div>
      <div className="nav__burger-block">
        <img className="nav__burger" src="icons/burger.svg" alt="burger_icon" />
      </div>
      <div className="nav__icons">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'nav__like-block nav__like-block--active'
              : 'nav__like-block'
          }
          to="/favorites"
        >
          <img className="nav__like" src="icons/like.svg" alt="like_icon" />
          {favoritesProducts.length > 0 && (
            <div className="nav__like-notification">
              {favoritesProducts.length}
            </div>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'nav__shop-block nav__shop-block--active'
              : 'nav__shop-block'
          }
          to="/cart"
        >
          <img className="nav__shop" src="icons/shop.svg" alt="shop_icon" />
          {sumOfCounters > 0 && (
            <div className="nav__shop-notification">{sumOfCounters}</div>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
