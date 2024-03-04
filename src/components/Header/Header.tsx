import { Link, NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import classNames from 'classnames';
import logo from '../../images/logo.svg';
import './Header.scss';
import { CartContext } from '../CartContext/CartContext';
import { Search } from '../Search';

const getClassLink = ({ isActive }: { isActive: boolean }) =>
  classNames('menu__link', { 'is-active': isActive });
const getClassLinkButton = ({ isActive }: { isActive: boolean }) =>
  classNames('nav-box__button', { 'is-active': isActive });
const getClassLinkButtonMenu = ({ isActive }: { isActive: boolean }) =>
  classNames('nav-box__button nav-box__button--menu', {
    'is-active': isActive,
  });

const pathnameList = ['/phones', '/tablets', '/accessories', '/favorites'];

export const Header = () => {
  const { pathname } = useLocation();
  const { orderedProducts, favoriteProducts } = useContext(CartContext);

  return (
    <header>
      <div className="header__container">
        <div className="header">
          <div className="header__right">
            <Link to="/" className="header__logo logo">
              <img src={logo} alt="LOGO" />
            </Link>
            <nav className="header__menu menu">
              <ul className="menu__list">
                <li className="menu__item">
                  <NavLink className={getClassLink} to="/">
                    home
                  </NavLink>
                </li>
                <li className="menu__item">
                  <NavLink className={getClassLink} to="/phones">
                    phones
                  </NavLink>
                </li>
                <li className="menu__item">
                  <NavLink className={getClassLink} to="/tablets">
                    tablets
                  </NavLink>
                </li>
                <li className="menu__item">
                  <NavLink className={getClassLink} to="/accessories">
                    accessories
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header__nav-box nav-box">
            {pathnameList.includes(pathname) && (
              <div className="nav-box--desktop">
                <Search />
              </div>
            )}
            <div className="nav-box__button">
              <NavLink
                to="/favorites"
                aria-label="Heart Like"
                className={getClassLinkButton}
              >
                <div className="icon icon--favourites">
                  {favoriteProducts.length > 0 && (
                    <span className="nav-box__counter icon--counter">
                      {favoriteProducts.length}
                    </span>
                  )}
                </div>
              </NavLink>
            </div>
            <div className="nav-box__button">
              <NavLink
                to="/cart"
                aria-label="Shopping bag"
                className={getClassLinkButton}
              >
                <div className="icon icon--cart">
                  {orderedProducts.length > 0 && (
                    <span className="nav-box__counter icon--counter">
                      {orderedProducts.reduce(
                        (sum, value) => sum + value.quantity,
                        0,
                      )}
                    </span>
                  )}
                </div>
              </NavLink>
            </div>
            <div className="nav-box__block">
              <NavLink
                to={{ pathname: '/menu' }}
                aria-label="Menu"
                className={getClassLinkButtonMenu}
              >
                <span className="icon icon--menu" />
              </NavLink>
            </div>
          </div>
        </div>

        {pathnameList.includes(pathname) && (
          <div className="header__search">
            <Search />
          </div>
        )}
      </div>
    </header>
  );
};
