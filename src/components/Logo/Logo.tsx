import { AppRoutes } from 'config';
import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => {
  return (
    <Link
      className="logo"
      to={AppRoutes.HomePage}
    >
      <img
        className="logo__img"
        alt="logo"
        src="img/icons/logo.svg"
      />
    </Link>
  );
};
