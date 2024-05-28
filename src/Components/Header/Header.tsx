import classNames from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import { Search } from '../Search/Search';
import { useContext } from 'react';
import { ProductContext } from '../../helper/ProductContext';

export const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const productPages =
    pathname === '/phones' ||
    pathname === '/tablets' ||
    pathname === '/accessories';

  const { card, favorites, amounCard } = useContext(ProductContext);
  const isRightPath = pathname === '/menu';

  return (
    <>
      <div className="header__items">
        <div className="header__items-left">
          <div className="header__logo">
            <img
              src="img/NiceGadgets.png"
              alt="icon"
              className="header__icon invert"
            />
          </div>
          <nav className="header__links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames('header__link', { 'is-active': isActive })
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                classNames('header__link', { 'is-active': isActive })
              }
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                classNames('header__link', { 'is-active': isActive })
              }
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                classNames('header__link', { 'is-active': isActive })
              }
            >
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className="header__items-right">
          {productPages && <Search />}

          <NavLink
            to="favorites"
            className={({ isActive }) =>
              classNames('header__favor favor', {
                'is-active': isActive,
              })
            }
          >
            <img src="img/WhiteHurt.png" alt="favorites" className="invert" />
            {!!favorites.length && (
              <div className="header__amount-box favor__amount-box">
                <div className="favor__amount">{favorites.length}</div>
              </div>
            )}
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) =>
              classNames('header__cart favor', {
                'is-active': isActive,
              })
            }
          >
            <img
              src="img/ShoppingBag(Cart).png"
              alt="cart"
              className="invert"
            />
            {!!card.length && (
              <div className="header__amount-box favor__amount-box">
                <div className="favor__amount">{amounCard}</div>
              </div>
            )}
          </NavLink>
        </div>

        {!isRightPath ? (
          <Link className="header__menu" to="menu">
            <img className="header__menu-icon" src="img/Union.png" />
          </Link>
        ) : (
          <Link className="header__menu" to="/">
            <img className="header__menu-icon" src="img/Christ.png" />
          </Link>
        )}
      </div>
    </>
  );
};
