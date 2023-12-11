import { Link, useLocation } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => {
  const isHomePage = useLocation().pathname === '/';

  return isHomePage ? (
    <button
      type="button"
      className="Logo"
      onClick={() => window.scrollTo(0, 0)}
    >
      <img
        alt="logo"
        src="icons/logo.svg"
      />
    </button>
  ) : (
    <Link
      to="/home"
      className="Logo"
      onClick={() => window.scrollTo(0, 0)}
    >
      <img
        alt="logo"
        src="icons/logo.svg"
      />
    </Link>
  );
};
