import { PageNavLink } from '../PageNavLink';
import './Navbar.scss';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <PageNavLink to="/" text="Home" />
        </li>

        <li className="navbar__item">
          <PageNavLink to="/phones" text="Phones" />
        </li>

        <li className="navbar__item">
          <PageNavLink to="/tablets" text="Tablets" />
        </li>

        <li className="navbar__item">
          <PageNavLink to="/accessories" text="Accessories" />
        </li>
      </ul>
    </nav>
  );
};
