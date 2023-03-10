import { PageNavLink } from './PageNavLink';

export const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="navbar__list">
        <PageNavLink to="/" title="Home" />
        <PageNavLink to="/phones" title="Phones" />
        <PageNavLink to="/tablets" title="Tablets" />
        <PageNavLink to="/accessories" title="Accessories" />
      </ul>
    </div>
  );
};
