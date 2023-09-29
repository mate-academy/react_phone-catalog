import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => {
  return (
    <Link
      to="/home"
      className="Logo"
    >
      <img
        alt="logo"
        src="icons/logo.svg"
      />
    </Link>
  );
};
