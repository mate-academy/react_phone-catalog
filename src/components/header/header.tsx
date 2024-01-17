import { Link } from 'react-router-dom';
import './header.scss';
// import logo from './LOGO.jpg';
// import logo from '../../img/LOGO.jpg';

export const Header = (() => {
  return (
    <header className="header">
      <div className="header__leftContainer">
        <Link to="/">
          <img src="../../img/LOGO.jpg" alt="Logo" />
        </Link>

        <nav className="navigation">
          <ul>
            <li className="navigation__item">
              <Link to="/">Home</Link>
            </li>
            <li className="navigation__item">
              <Link to="/phones">Phones</Link>
            </li>
            <li className="navigation__item">
              <Link to="/tablets">Tablets</Link>
            </li>
            <li className="navigation__item">
              <Link to="/accessories">Accessories</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__rightConteiner">
        <Link to="/">
          <img src="/path/to/logo.png" alt="Favorites" />
        </Link>
        <Link to="/">
          <img src="/path/to/logo.png" alt="Cart" />
        </Link>
      </div>
    </header>
  );
});
