import './Header.scss';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <nav id="header" className="nav">
      <Link to="/" className="nav__item">
        <img src="./icons/logo.svg" alt="logo" />
      </Link>

      <Link to="#menu" className="nav__item nav__burger">
        <img src="./icons/burger.svg" alt="Open menu button" />
      </Link>
    </nav>
  );
};
