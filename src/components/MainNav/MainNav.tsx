import classNames from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useContext, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Burger } from '../Burger';
import { PageNavLink } from '../PageNavLink';
import { Filter } from '../Filter';
import { ProductsContext } from '../../ProductsContext';

export const MainNav: React.FC = () => {
  const { favProducts, cart } = useContext(ProductsContext);
  const [burgerActive, setBurgerActive] = useState(false);
  const location = useLocation().pathname.split('/').filter(x => x).join('');
  const nodeRef = useRef(null);
  const isPhonePage = location === 'phones'
    || location === 'tablets'
    || location === 'accessories'
    || location === 'favourites';

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
      <CSSTransition
        in={burgerActive}
        nodeRef={nodeRef}
        timeout={300}
        classNames="navibar__transition"
      >
        <div
          className={classNames('navbar-menu', { 'is-active': burgerActive })}
          id="navMenu"
          ref={nodeRef}
        >
          <div className="navbar-start navibar--start">
            <Link
              to="/"
              className={classNames(
                'navbar-item has-text-dark',
                { 'navibar__item--active': useLocation().pathname === '/' },
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
            to="favourites"
            className={({ isActive }) => classNames(
              'navbar-item navibar__icon is-justify-content-center',
              { 'navibar__item--active': isActive },
            )}
          >
            {favProducts.length
              ? (
                <i
                  className="
              fa-regular
              fa-heart
              navibar__icon--hidden
              has-badge-rounded
              has-badge-danger
              "
                  data-badge={favProducts.length}
                />

              ) : (
                <i className="fa-regular fa-heart navibar__icon--hidden" />
              ) }
            <span className="navibar__icon-text">Favorites</span>
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) => classNames(
              'navbar-item navibar__icon is-justify-content-center',
              { 'navibar__item--active': isActive },
            )}
          >
            {cart.length
              ? (
                <i
                  className="
              fa-solid
              fa-bag-shopping
              navibar__icon--hidden
              has-badge-rounded
              has-badge-danger
              "
                  data-badge={cart.length}
                />

              ) : (
                <i className="fa-solid fa-bag-shopping navibar__icon--hidden" />
              ) }
            <span className="navibar__icon-text">Basket</span>
          </NavLink>
        </div>
      </CSSTransition>
    </nav>
  );
};
