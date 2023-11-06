import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => {
  return (
    <Link to="/" className="Logo">
      <img src="img/icons/logo_icon.svg" alt="Logo Icon" />
    </Link>
  );
};
