import { PageNavLink } from '../PageNavLink/PageNavLink';

import './Nav.scss';

export const Nav = () => {
  return (
    <nav>
      <ul className="nav__list">
        <li>
          <PageNavLink to="home" text="Home" />
        </li>

        <li>
          <PageNavLink to="phones" text="Phones" />
        </li>

        <li>
          <PageNavLink to="tablets" text="tablets" />
        </li>

        <li>
          <PageNavLink to="accessories" text="accessories" />
        </li>
      </ul>
    </nav>
  );
};
