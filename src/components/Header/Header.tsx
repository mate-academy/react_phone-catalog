/* eslint-disable max-len */
import { NavLink, Link } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';
import { useCart } from '../../Functional/CartContext/CartContext';
import { Aside } from '../Aside/Aside';

export const Header = () => {
  const { cart, favorites } = useCart();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'is-active': isActive,
    });

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__logo">
          <Link to="/">
            <img src="/figmaLogo/Logo.svg" alt="NiceGadgets logo" />
          </Link>
        </div>

        <nav className="header__nav">
          <NavLink to="/" className={getLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            PHONES
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            TABLETS
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            ACCESSORIES
          </NavLink>
        </nav>

        <div className="header__head--logo">
          <div className="header__heart">
            <Link to="/favorites" className="header__heart__top">
              <img
                src="/figmaLogo/HeartLove.svg"
                alt="Favorites"
                className="header__heart__top__btn"
              />
              {favorites.length > 0 && (
                <span className="cart-count cart-count--favorites">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>

          <div className="header__packet">
            <Link to="/cart" className="header__packet__top">
              <img
                src="/figmaLogo/Packet.svg"
                alt="Cart"
                className="header__packet__top__btn"
              />
              {cart.length > 0 && (
                <span className="cart-count cart-count--cart">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          <div className="header__burger">
            <Link to="menu" className="header__burger-menu"></Link>
          </div>
        </div>
        <Aside />
      </div>
    </header>
  );
};
