import { Logo } from '../Logo';
import { NavbarLink } from './NavbarLink';
import favorite from '../../assets/svg/heart.svg';
import cart from '../../assets/svg/cart.svg';
import './Navbar.scss';

type NavbarProps = {
  children?: React.ReactNode;
};

export const Navbar = ({ children }: React.PropsWithChildren<NavbarProps>) => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Logo />
        </li>

        <li className="nav__item">
          <NavbarLink title="Home">Home</NavbarLink>
        </li>

        <li className="nav__item">
          <NavbarLink title="Phones">Phones</NavbarLink>
        </li>

        <li className="nav__item">
          <NavbarLink title="Tablets">Tablets</NavbarLink>
        </li>

        <li className="nav__item">
          <NavbarLink title="Accessories">Accessories</NavbarLink>
        </li>
      </ul>

      <ul className="nav__list nav__list--no-gap">
        <li className="nav__item">{children}</li>

        <li className="nav__item">
          <NavbarLink title="Favorites">
            <img
              className="nav__icon"
              src={favorite}
              alt="Favorites"
            />
          </NavbarLink>
        </li>

        <li className="nav__item">
          <NavbarLink title="Cart">
            <img
              className="nav__icon"
              src={cart}
              alt="Cart"
            />
          </NavbarLink>
        </li>
      </ul>
    </nav>
  );
};
