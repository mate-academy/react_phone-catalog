import { PageNavLink } from '../PageNavLink/PageNavLink';
import { Pathname } from '../../types/Pathname';
import './navbar.scss';

export const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="navbar__list">
        <PageNavLink to="/" title="Home" />
        <PageNavLink to={Pathname.Phones} title="Phones" />
        <PageNavLink to={Pathname.Tablets} title="Tablets" />
        <PageNavLink to={Pathname.Accessories} title="Accessories" />
      </ul>
    </div>
  );
};
