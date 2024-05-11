import { Link, NavLink } from 'react-router-dom';
import './NavBar.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { NavBarMobile } from '../NavBarMobile';

const navBarLinkItems = ['home', 'phones', 'tablets', 'accessories'];

export const NavBar = () => {
  const [mobileNavBarTransition, setMobileNavBarTransition] = useState(100);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar__logo">
          <img
            className="navbar__logo-image"
            src="./img/logo/logo-nice-gadgets.svg"
            alt="LOGO"
          />
        </Link>

        <div className="navbar__links links">
          <ul className="links__items">
            {navBarLinkItems.map(item => (
              <li className="links__item" key={item}>
                <NavLink
                  to={`/${item === 'home' ? '' : item}`}
                  className={({ isActive }) =>
                    classNames('links__item-link', {
                      'active-navlink': isActive,
                    })
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar__buttons">
            <Link to="/favourite" className="navbar-button button__favourite">
              <span className="counter counter-favourite">18</span>
            </Link>
            <Link to="/basket" className="navbar-button button__basket">
              <span className="counter counter-basket">99</span>
            </Link>
          </div>
        </div>

        <div
          className="navbar-button button__mobile-menu"
          onClick={() => setMobileNavBarTransition(0)}
        />
      </nav>

      <NavBarMobile
        transition={mobileNavBarTransition}
        setTransition={setMobileNavBarTransition}
        navBarLinkItems={navBarLinkItems}
      />
    </>
  );
};
