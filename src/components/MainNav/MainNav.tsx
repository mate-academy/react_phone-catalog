import classNames from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Burger } from '../Burger';
import { PageNavLink } from '../PageNavLink';
import { Filter } from '../Filter';

export const MainNav: React.FC = () => {
  const [burgerActive, setBurgerActive] = useState(false);
  const location = useLocation().pathname;

  const isPhonePage = location.split('/').filter(x => x)[0] === 'phones';

  return (
    <nav
      className="navbar is-transparent navibar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item px-0 mr-6 ml-5">
          <span className="navibar__logo" />
        </Link>
        <Burger
          burgerActive={burgerActive}
          setBurgerActive={setBurgerActive}
        />
      </div>
      <div
        className={classNames('navbar-menu', { 'is-active': burgerActive })}
        id="navMenu"
      >
        <div className="navbar-start navibar--start">
          <Link
            to="/"
            className={classNames(
              'navbar-item', { 'navibar__item--active': location === '/' },
            )}
          >
            Home
          </Link>
          <PageNavLink text="Phones" to="phones" />
          <PageNavLink text="Tablets" to="tablets" />
          <PageNavLink text="Accessories" to="accessories" />
        </div>

        {isPhonePage && <Filter />}

        <NavLink
          to="favs"
          className="navbar-item navibar__icon is-justify-content-center"
        >
          <i className="fa-regular fa-heart navibar__icon--hidden" />
          <span className="navibar__icon-text">Favorites</span>
        </NavLink>
        <NavLink
          to="basket"
          className="navbar-item navibar__icon is-justify-content-center"
        >
          <i className="fa-solid fa-bag-shopping navibar__icon--hidden" />
          <span className="navibar__icon-text">Basket</span>
        </NavLink>
      </div>
    </nav>
  );
};
