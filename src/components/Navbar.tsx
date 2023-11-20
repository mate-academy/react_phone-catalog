import { PageNavLink } from './PageNavLink';
import '../styles/navigation.scss';

export const Navbar = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <PageNavLink to="/" text="Home" />
        </li>
        <li className="navigation__item">
          <PageNavLink to="/phones" text="Phones" />
        </li>
        <li className="navigation__item">
          <PageNavLink to="/tablets" text="Tablets" />
        </li>
        <li className="navigation__item">
          <PageNavLink to="/accessories" text="Accessories" />
        </li>
      </ul>
    </nav>
  );
};
