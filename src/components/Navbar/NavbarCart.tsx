import { NavLink } from 'react-router-dom';
import { Logo } from '../UI/Logo';
import cart from '../../assets/svg/cart.svg';
import './Navbar.scss';
import { getClassNameForNavLink } from '../../helpers/stringOperations';

type NavbarCartProps = {
  cartCount: number;
};

export const NavbarCart = ({ cartCount }: NavbarCartProps) => (
  <nav className="nav">
    <div className="nav__item">
      <Logo />
    </div>

    <div className="nav__item">
      <NavLink
        className={getClassNameForNavLink('nav__link', ' nav__link--icon')}
        to="/cart"
        title="Cart"
      >
        <img className="nav__icon" src={cart} alt="Cart" />
        <span className="nav__count">{cartCount}</span>
      </NavLink>
    </div>
  </nav>
);
