import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => {
  const handleToTopScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
