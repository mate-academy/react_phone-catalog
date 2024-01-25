import { Link } from 'react-router-dom';
import './Logo.scss';
import { handleToTopScroll } from '../../helpers/functions/handleToTopScroll';

export const Logo = () => {
  return (
    <Link
      to="/"
      className="Logo"
      onClick={handleToTopScroll}
    >
      <img src="img/icons/logo_icon.svg" alt="Logo Icon" />
    </Link>
  );
};
