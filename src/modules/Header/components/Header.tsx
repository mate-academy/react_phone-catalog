import { Link } from 'react-router-dom';
import './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">
          <img src="../../../../public/icons/header-logo.png" alt="home" />
        </Link>
      </div>
      <div className="header__navigation">
        <nav>
          <Link to="/">HOME</Link>
          <Link to="/">PHONES</Link>
          <Link to="/">TABLETS</Link>
          <Link to="/">ACCESORIES</Link>
        </nav>
      </div>
      <div className="header__icons">
        <div className="icons__favourite">
          <Link to="/">
            <img src="" alt="favourite" />
          </Link>
        </div>
        <div className="icons__basket">
          <Link to="/">
            <img src="" alt="basket" />
          </Link>
        </div>
        <div className="icons__open-navigation">
          <Link to="/">
            <img src="" alt="menu" />
          </Link>
        </div>
      </div>
    </div>
  );
};
