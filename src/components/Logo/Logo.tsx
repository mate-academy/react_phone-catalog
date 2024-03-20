import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src="img/Logo.svg" alt="Logo" />
    </Link>
  );
};
