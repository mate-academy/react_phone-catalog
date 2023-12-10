import { Link } from 'react-router-dom';
import './LogoLink.scss';

export const LogoLink = () => {
  return (
    <Link
      to="home"
      className="logo"
    >
      <img
        src="icons/logo.svg"
        alt="logo"
        className="logo-img"
      />
    </Link>
  );
};
