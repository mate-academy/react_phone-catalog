import { Link } from 'react-router-dom';

export const Logo = () => (
  <Link to="/" className="logo header__logo">
    <img
      src="./img/logo/logo.svg"
      alt="Logo"
      className="logo__image"
    />
  </Link>
);
