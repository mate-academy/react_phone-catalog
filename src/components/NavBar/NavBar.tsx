import { FC } from 'react';
import { PageNavLink } from '../PageNavLink';
import './NavBar.scss';

export const NavBar: FC = () => (
  <nav
    className="header__navbar navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar__container">
      <PageNavLink url="/" title="home" />
      <PageNavLink url="/phones" title="Phones" />
      <PageNavLink url="/tablets" title="tablets" />
      <PageNavLink url="/accessories" title="accessories" />
    </div>
  </nav>
);
