import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => (
  <Link to="/" className="logo">
    <img src="./img/svg/Logo.svg" alt="logo" />
  </Link>
);
