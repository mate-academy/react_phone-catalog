import { Link, NavLink } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Link to="/" className="footer__link-logo">
        <img src="./img/icons/Logo.png" alt="Nice gadgets" className="footer__logo" />
      </Link>
      <nav className="nav_bar footer__nav-bar">
        <NavLink to="/home" className="nav-bar__link">
          GitHub
        </NavLink>
        <NavLink to="/phones" className="nav-bar__link">
          Contacts
        </NavLink>
        <NavLink to="/tablets" className="nav-bar__link">
          Rights
        </NavLink>
      </nav>
      <div className="footer__nav-up">
        <p className="footer__nav-up--subtitle">Back to top</p>
        <button className="footer__button"></button>
      </div>
    </footer>
  );
};
