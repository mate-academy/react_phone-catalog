import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useContext } from 'react';
import { CategoriesContext } from '../CategoriesContext/CategoriesContext';
import s from './Navbar.module.scss';

const navLinkActive = ({ isActive }: { isActive: boolean }) => {
  return classNames(`navbar-item is-uppercase ${s.link_style}`, {
    [`${s.link_style__active}`]: isActive,
  });
};

export const Navbar = () => {
  // const [searchParams] = useSearchParams();
  const categories = useContext(CategoriesContext);

  return (
    <nav
      data-cy="nav"
      className={`navbar ml-5 ${s.navbar_style}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand is-flex is-align-items-center is-gap-5">
        <NavLink to="/">
          <img src="/img/logo/logo.png" alt="Logo" />
        </NavLink>
        <NavLink to="/" className={navLinkActive}>
          Home
        </NavLink>
        {categories.map(category => (
          <NavLink
            className={navLinkActive}
            key={category.name}
            to={`/${category.slug}`}
          >
            {category.name}
            {/* <p className="Category_title">{category.name}</p> */}
          </NavLink>
        ))}
        {/* <NavLink
            to={{ pathname: '/people', search: searchParams.toString() }}
            className={navLinkActive}
          >
            People
          </NavLink> */}
      </div>
    </nav>
  );
};
