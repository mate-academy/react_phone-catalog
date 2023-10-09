import { Link } from 'react-router-dom';
import logo from '../../assets/svg/logo.svg';
import './logo.scss';

export const Logo = () => (
  <Link to="/" className="logo">
    <img src={logo} alt="logo" />
  </Link>
);
