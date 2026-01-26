import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { CategoriesContext } from '../../Context/CategoriesContext';
import Cart from '/img/icons/cart.svg';
import { ProductsContext } from '../../Context/ProductsContext';
import s from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import { faBucket } from '@fortawesome/free-solid-svg-icons';

const navLinkActive = ({ isActive }: { isActive: boolean }) => {
  return classNames(`navbar-item is-uppercase ${s.link_style} `, {
    [`${s.link_style__active}`]: isActive,
  });
};

export const Navbar = () => {
  // const [searchParams] = useSearchParams();
  const categories = useContext(CategoriesContext);
  const { cartProds, favourites } = useContext(ProductsContext);

  return (
    <nav
      data-cy="nav"
      className={`navbar ml-5 ${s.navbar_style}`}
      role="navigation"
      aria-label="main navigation"
    >
      {/* <div className="navbar-brand"> */}
      <div className="navbar-menu">
        <div className="navbar-start is-flex is-align-items-center is-gap-5">
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
        </div>
        <div className="navbar-end">
          <div className="buttons">
            <NavLink to="/favourites" className={navLinkActive}>
              <span
                className="icon"
                style={{ fontSize: '20px', color: 'black' }}
              >
                <FontAwesomeIcon icon={faHeart} />
                <span className="badge">{favourites.length}</span>
              </span>
            </NavLink>
            <NavLink to="/cart" className={navLinkActive}>
              <img src={Cart} alt="Cart" width={15} height={16} />
              <span className="badge">{cartProds.length}</span>
            </NavLink>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* <NavLink
            to={{ pathname: '/people', search: searchParams.toString() }}
            className={navLinkActive}
          >
            People
          </NavLink> */}
    </nav>
  );
};
