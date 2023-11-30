import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import favorite from '../../images/favorite.svg';
import cart from '../../images/cart.svg';
import logo from '../../images/Logo.svg';
import './Header.scss';
import { Search } from '../Search/Search';
import { useCart } from '../../CartContext';

const getLinkClass
  = ({ isActive }: { isActive: boolean }) => classNames('header__nav--link',
    { 'is-active': isActive });

export const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const { cartQuantity } = useCart();

  return (
    <header className="header">
      <div className="header__left">
        <a href="/" className="header__logo">
          <img src={logo} alt="logo" className="header__logo--img" />
        </a>

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
      </div>

      <div className="header__right">
        {path === '/phones'
          && (
            <Search
              placeholder="Search in phones"
            />
          )}
        {path === '/tablets'
          && (
            <Search
              placeholder="Search in tablets"
            />
          )}
        {path === '/accessories'
          && (
            <Search
              placeholder="Search in accessories"
            />
          )}
        <NavLink to="/favorites" className={getLinkClass}>
          <img src={favorite} alt="favorite" className="header__right--img" />
        </NavLink>
        <NavLink to="/cart" className={getLinkClass}>
          <img src={cart} alt="cart" className="header__cart--img" />
          {cartQuantity !== 0
            && <p className="header__cart--quantity">{cartQuantity}</p>}
        </NavLink>
      </div>
    </header>
  );
};
