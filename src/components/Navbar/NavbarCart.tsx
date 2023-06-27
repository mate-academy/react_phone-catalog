import { NavLink } from 'react-router-dom';
import { Logo } from '../UI/Logo';
import cart from '../../assets/svg/cart.svg';
import './Navbar.scss';
import { getClassNameForNavLink } from '../../helpers/stringOperations';

export const NavbarCart = () => (
  <nav className="nav">
    <div className="nav__item">
      <Logo />
    </div>

    <div className="nav__item">
      <NavLink className={getClassNameForNavLink('nav__link')} to="/cart" title="Cart">
        <img className="nav__icon" src={cart} alt="Cart" />
      </NavLink>
    </div>
  </nav>
);
