import { PageNavLink } from '../PageNavLink/PageNavLink';
import { Logo } from '../Logo/Logo';

import './Navbar.scss';

export const Navbar = () => {
  return (
    <nav
      className="nav"
      role="navigation"
      aria-label="main navigation"
      data-cy="categoryLinksContainer"
    >
      <ul className="nav__list">
        <Logo />

        <PageNavLink to="/" title="Home" />

        <PageNavLink to="/phones" title="Phones" />

        <PageNavLink to="/tablets" title="Tablets" />

        <PageNavLink to="accessories" title="Accessories" />
      </ul>
    </nav>
  );
};
