import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Link
      to="/"
      onClick={scrollToTop}
    >
      <img
        src="./img/icons/LOGO.svg"
        alt="logo"
        className="logo"
      />
    </Link>
  );
};
