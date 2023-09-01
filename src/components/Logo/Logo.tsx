import { Link } from 'react-router-dom';

import './Logo.scss';

export const Logo = () => (
  <Link to="/" className="Logo">
    <img
      className="Logo__img"
      src="../public/Logo.svg"
      alt="logo"
    />
  </Link>
);
