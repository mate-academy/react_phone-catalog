import { PageNavLink } from '../PageNavLink/PageNavLink';
import './style.scss';

export const Nav: React.FC = () => {
  return (
    <ul className="nav">
      <li className="nav__item">
        <PageNavLink to="/" text="Home" />
      </li>

      <li className="nav__item">
        <PageNavLink to="phones" text="Phones" />
      </li>

      <li className="nav__item">
        <PageNavLink to="tablets" text="Tablets" />
      </li>

      <li className="nav__item">
        <PageNavLink to="accessories" text="Accessories" />
      </li>
    </ul>
  );
};
