import { Link } from 'react-router-dom';
import LogoImg from '../../Images/LOGO.svg';
import './Logo.scss';

export const Logo = () => (
  <Link to="/">
    <img src={LogoImg} alt="logo" className="Logo" />
  </Link>
);
