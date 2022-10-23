import './Header.scss';
import '../../scss/blocks/nav.scss';
import { Link } from 'react-router-dom';
import { PageNavLink } from '../PageNavLink';
import logo from '../../img/LOGO.svg';

export const Header = () => (
  <header className="page__header header" id="header">
    <div className="logo header__logo">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </div>
    <nav className="nav">
      <ul className="nav__pages">
        <li className="nav__page">
          <PageNavLink to="//" text="Home" />
        </li>
        <li className="nav__page">
          <PageNavLink to="phones" text="Phones" />
        </li>
        <li className="nav__page">
          <PageNavLink to="tablets" text="Tablets" />
        </li>
        <li className="nav__page">
          <PageNavLink to="accessories" text="Accessories" />
        </li>
      </ul>
      <div className="header__buttons">
        <PageNavLink to="favorites" text="" button icon="heart" />
        <PageNavLink to="cart" text="" button icon="cart" />
      </div>
    </nav>
  </header>
);
