import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import classNames from 'classnames';
import { CategoriesContext } from '../../Context/CategoriesContext';
import { ProductsContext } from '../../Context/ProductsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { asset } from '../../hooks/utils';

import s from './Navbar.module.scss';

const navLinkActive = ({ isActive }: { isActive: boolean }) => {
  return classNames(`navbar-item is-uppercase ${s.link_style} `, {
    [`${s.link_style__active}`]: isActive,
  });
};

const BagIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 14 15"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.13333 0.266667C2.25924 0.0987961 2.45683 0 2.66667 0H10.6667C10.8765 0 11.0741 0.0987961 11.2 0.266667L13.2 2.93333C13.2865 3.04873 13.3333 3.18909 13.3333 3.33333V12.6667C13.3333 13.1971 13.1226 13.7058 12.7475 14.0809C12.3725 14.456 11.8638 14.6667 11.3333 14.6667H2C1.46957 14.6667 0.960859 14.456 0.585786 14.0809C0.210714 13.7058 0 13.1971 0 12.6667V3.33333C0 3.18909 0.0467852 3.04873 0.133333 2.93333L2.13333 0.266667ZM3 1.33333L1.33333 3.55556V12.6667C1.33333 12.8435 1.40357 13.013 1.5286 13.1381C1.65362 13.2631 1.82319 13.3333 2 13.3333H11.3333C11.5101 13.3333 11.6797 13.2631 11.8047 13.1381C11.9298 13.013 12 12.8435 12 12.6667V3.55555L10.3333 1.33333H3Z"
      fill="#0F0F11"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 3.33335C0 2.96516 0.298477 2.66669 0.666667 2.66669H12.6667C13.0349 2.66669 13.3333 2.96516 13.3333 3.33335C13.3333 3.70154 13.0349 4.00002 12.6667 4.00002H0.666667C0.298477 4.00002 0 3.70154 0 3.33335Z"
      fill="#0F0F11"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.00016 5.33334C4.36835 5.33334 4.66683 5.63182 4.66683 6.00001C4.66683 6.53044 4.87754 7.03915 5.25262 7.41422C5.62769 7.7893 6.1364 8.00001 6.66683 8.00001C7.19726 8.00001 7.70597 7.7893 8.08104 7.41422C8.45612 7.03915 8.66683 6.53044 8.66683 6.00001C8.66683 5.63182 8.96531 5.33334 9.3335 5.33334C9.70169 5.33334 10.0002 5.63182 10.0002 6.00001C10.0002 6.88407 9.64897 7.73191 9.02385 8.35703C8.39873 8.98215 7.55088 9.33334 6.66683 9.33334C5.78277 9.33334 4.93493 8.98215 4.30981 8.35703C3.68469 7.73191 3.3335 6.88407 3.3335 6.00001C3.3335 5.63182 3.63197 5.33334 4.00016 5.33334Z"
      fill="#0F0F11"
    />
  </svg>
);

export const Navbar = () => {
  const categories = useContext(CategoriesContext);
  const cartProds = useContextSelector(ProductsContext, ctx => ctx.cartProds);
  const favourites = useContextSelector(ProductsContext, ctx => ctx.favourites);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add(s.noScroll);
    } else {
      document.body.classList.remove(s.noScroll);
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isActive]);

  const location = useLocation();

  useEffect(() => {
    setIsActive(false);
  }, [location.pathname]);

  const totalQuantity = cartProds.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  return (
    <nav
      data-cy="nav"
      className={`navbar ${s.navbar_style}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand ml-5">
        <Link to="/" className={`${s.logo}`}>
          <img src={asset('img/logo/logo.png')} alt="Logo" />
        </Link>
        <a
          className={`navbar-burger is-hidden-tablet ${isActive ? 'is-active' : ''}`}
          role="button"
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        className={`navbar-menu is-flex-tablet ${isActive ? 'is-active' : ''} ${s.navbar__menu}`}
      >
        <div
          className={`navbar-start is-flex is-align-items-center ${s.navbar__menu__start}`}
        >
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
            </NavLink>
          ))}
        </div>
        <div className={`navbar-end is-flex ${s.icons_wrap}`}>
          <NavLink
            to="/favourites"
            className={args => classNames(navLinkActive(args), s.iconLink)}
          >
            <span
              className="icon"
              style={{
                fontSize: '16px',
                color: '#0f0f11',
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
              <span className={`badge ${s.badge_style}`}>
                {favourites.length}
              </span>
            </span>
          </NavLink>
          <NavLink
            to="/cart"
            className={args => classNames(navLinkActive(args), s.iconLink)}
          >
            <span
              className="icon"
              style={{ fontSize: '16px', color: '#0f0f11' }}
            >
              <BagIcon />
              <span className={`badge ${s.badge_style}`}>{totalQuantity}</span>
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
