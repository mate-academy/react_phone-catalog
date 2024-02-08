import { Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src="img/logo.png" alt="logo" />
      </Link>
    </header>
  );
};
