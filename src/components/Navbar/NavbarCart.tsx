import { NavLink } from 'react-router-dom';
import { Logo } from '../UI/Logo';
import cart from '../../assets/svg/cart.svg';
import './Navbar.scss';

const isLinkActive = ({ isActive }: { isActive: boolean }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`;

export const NavbarCart = () => (
  <nav className="nav">
    <div className="nav__item">
      <Logo />
    </div>

    <div className="nav__item">
      <NavLink className={isLinkActive} to="/cart" title="Cart">
        <img className="nav__icon" src={cart} alt="Cart" />
      </NavLink>
    </div>
  </nav>
);
