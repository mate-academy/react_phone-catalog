import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-inner">

        <div className="logo" />

        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/phones">Phones</NavLink>
          <NavLink to="/tablets">Tablets</NavLink>
          <NavLink to="/accessories">Accessories</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
