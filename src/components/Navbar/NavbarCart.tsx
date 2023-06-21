import { Logo } from '../Logo';
import { NavbarLink } from './NavbarLink';
import cart from '../../assets/svg/cart.svg';
import './Navbar.scss';

export const NavbarCart = () => (
  <nav className="nav">
    <div className="nav__item">
      <Logo />
    </div>

    <div className="nav__item">
      <NavbarLink title="Cart">
        <img
          className="nav__icon"
          src={cart}
          alt="Cart"
        />
      </NavbarLink>
    </div>
  </nav>
);
