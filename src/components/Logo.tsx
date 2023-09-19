import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => {
  return (
    <div className="logo">
      <Link to="/" className="logo__link">
        <img src="./img/logo.svg" className="logo__image" alt="Logo" />
      </Link>
    </div>
  );
};
