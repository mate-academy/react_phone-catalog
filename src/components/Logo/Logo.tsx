import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img
        src={`${process.env.PUBLIC_URL}/images/logo.svg`}
        alt="LOGO"
        className="logo__img"
      />
    </Link>
  );
};
