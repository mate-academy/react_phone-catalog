import { Link } from 'react-router-dom';
import './Navbar.scss';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link
        to="/"
        className="navbar__link"
      >
        Home
      </Link>
      <Link
        to="/phones"
        className="navbar__link"
      >
        Phones
      </Link>
      <Link
        to="/tablets"
        className="navbar__link"
      >
        Tablets
      </Link>
      <Link
        to="/accessories"
        className="navbar__link"
      >
        Accessories
      </Link>
    </nav>
  );
};
