import { Link } from 'react-router-dom';
import LogoImg from '../../icons/LOGO.svg';
import './Logo.scss';

export const Logo = () => {
  return (
    <Link
      to="/home"
      className="Logo"
    >
      <img src={LogoImg} alt="logo" />
    </Link>
  );
};
