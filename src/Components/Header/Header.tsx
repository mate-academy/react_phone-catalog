import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';
import { scrollToTop } from '../../utils/functions';

export const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <Link to="" className="navbar__title navbar__logo" onClick={scrollToTop}>
        <img src={`${import.meta.env.BASE_URL}/img/Logo.svg`} alt="logo" />
      </Link>
      <div className="navbar navbar__start">
        <NavLink
          to="home"
          className={classNames('navbar__title', {
            active: location.pathname === '/',
          })}
          onClick={scrollToTop}
        >
          Home
        </NavLink>
        <NavLink to="phones" className="navbar__title" onClick={scrollToTop}>
          Phones
        </NavLink>
        <NavLink to="tablets" className="navbar__title" onClick={scrollToTop}>
          Tablets
        </NavLink>
        <NavLink
          to="accessories"
          className="navbar__title"
          onClick={scrollToTop}
        >
          Accessories
        </NavLink>
      </div>
      <div className="navbar">
        <a className="navbar__end icons">
          <img
            src={`${import.meta.env.BASE_URL}/img/like.svg`}
            alt="logo"
            className="logo"
          />
        </a>
        <a className="navbar__end icons">
          <img
            src={`${import.meta.env.BASE_URL}/img/buy.svg`}
            alt="logo"
            className="logo"
          />
        </a>
      </div>
      <a className="navbar__end icons menu">
        <img
          src={`${import.meta.env.BASE_URL}/img/Menu.svg`}
          alt="logo"
          className="logo"
        />
      </a>
    </div>
  );
};
