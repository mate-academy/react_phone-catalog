import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './Navbar.scss';

const links = [
  { value: 'home', href: '/' },
  { value: 'phones', href: '/phones' },
  { value: 'tablets', href: '/tablets' },
  { value: 'accessories', href: '/accessories' },
];

const classes = ({ isActive }: { isActive: boolean }) => cn(
  'link',
  'navbar__link',
  { 'navbar__link-active': isActive },
);

const Navbar = () => (
  <nav className="navbar">
    <ul className="navbar__list">
      {links.map(({ value, href }) => (
        <li key={href} className="navbar__item">
          <NavLink className={classes} to={href}>
            {value}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
