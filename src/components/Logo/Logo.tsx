import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => (
  <Link to="/" className="logo">
    <img src="./img/icons/logo.svg" alt="LOGO" className="logo__image" />
  </Link>
);
