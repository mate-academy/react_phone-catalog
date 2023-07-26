import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollToTop';
import './Logo.scss';

export const Logo: React.FC = () => {
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
