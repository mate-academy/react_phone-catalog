import { Link } from 'react-router-dom';

export const HeaderLogo = () => (
  <Link to="/" className="header__logos">
    <img
      className="header__logo"
      src="./img/logo.svg"
      alt="logo"
      loading="lazy"
    />
  </Link>
);
