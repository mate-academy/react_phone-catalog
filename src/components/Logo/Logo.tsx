import { Link } from 'react-router-dom';
import './Logo.scss';
import LogoImage from '../../images/icons/LOGO.svg';

export const Logo = () => (
  <Link
    to="/"
    className="Logo"
  >
    <img
      src={LogoImage}
      alt="Logo"
      className="Logo--image"
    />
  </Link>
);
