import { Link, NavLink, useLocation } from 'react-router-dom';
import './TopBar.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { CartContext, FavoritesContext } from '../utils/contexts';

export const TopBar = () => {
  const location = useLocation();
  const favoritescontext = useContext(FavoritesContext);
  const cartContext = useContext(CartContext);

  if (!favoritescontext || !cartContext) {
    return;
  }

  const { favorites } = favoritescontext;
  const { cart } = cartContext;

  return (
    <>
      <div className="topbar">
        <Link to="/" className="topbar__link">
          <img src="./img/logos/header-logo.png" alt="logo" />
        </Link>
        <div className="topbar__buttons-right">
          <Link to="/menu" className="topbar__icon topbar__icon--menu" />
        </div>
      </div>

      <div className="topbar--for-wide-witdh">
        <Link to="/" className="topbar__link">
          <img src="./img/logos/header-logo.png" alt="logo" />
        </Link>
        <nav className="topbar__nav">
          <ul className="topbar__list">
            <li className="topbar__list-element">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames('topbar__nav-link', {
                    'topbar__nav-link--active': isActive,
                  })
                }
              >
                Home
              </NavLink>
            </li>
            <li className="topbar__list-element">
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  classNames('topbar__nav-link', {
                    'topbar__nav-link--active': isActive,
                  })
                }
              >
                Phones
              </NavLink>
            </li>
            <li className="topbar__list-element">
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  classNames('topbar__nav-link', {
                    'topbar__nav-link--active': isActive,
                  })
                }
              >
                Tablets
              </NavLink>
            </li>
            <li className="topbar__list-element">
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  classNames('topbar__nav-link', {
                    'topbar__nav-link--active': isActive,
                  })
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
        <ul className="topbar__buttons-right">
          <li className="topbar__button">
            <div
              className={classNames('topbar__button-wrapper', {
                'topbar__button-wrapper--active':
                  location.pathname.includes('favorites'),
              })}
            >
              <NavLink
                to="/favorites"
                className="topbar__icon topbar__icon--favorites"
              >
                {favorites.length > 0 ? (
                  <div className="topbar__icon-number">{favorites.length}</div>
                ) : null}
              </NavLink>
            </div>
          </li>
          <li className="topbar__button">
            <div
              className={classNames('topbar__button-wrapper', {
                'topbar__button-wrapper--active':
                  location.pathname.includes('cart'),
              })}
            >
              <NavLink to="/cart" className="topbar__icon topbar__icon--cart">
                {cart.length > 0 ? (
                  <div className="topbar__icon-number">{cart.length}</div>
                ) : null}
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
