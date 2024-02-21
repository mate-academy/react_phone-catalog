import { Link } from 'react-router-dom';
import LOGO from '../../assets/images/icons/logo.svg';
import './Logo.scss';

export const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img
        src={LOGO}
        alt="LOGO"
        className="logo__img"
      />
    </Link>
  );
};
