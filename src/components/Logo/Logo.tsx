import { Link } from 'react-router-dom';
import './Logo.scss';
import LogoImg from '../../images/icons/Logo.svg';

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
