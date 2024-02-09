import './Logo.scss';
import { Link } from 'react-router-dom';

export const Logo = () => (
  <Link to="/">
    <img
      className="icon-apple"
      src="img/icons/free-icon-mac-os-logo-2235.png"
      alt="icon-mac"
    />
  </Link>

);
