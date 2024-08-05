import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src="./img/icons/Logo.png" alt="Nice gadgets" className="header__logo" />
      </Link>
      <nav className="nav-bar">
        <NavLink to="/home" className="nav-bar__link">
          Home
        </NavLink>
        <NavLink to="/home" className="nav-bar__link">
          Phones
        </NavLink>
        <NavLink to="/home" className="nav-bar__link">
          tablets
        </NavLink>
        <NavLink to="/home" className="nav-bar__link">
          accessories
        </NavLink>
      </nav>
      <h1>HELLO</h1>
    </header>
  );
};
