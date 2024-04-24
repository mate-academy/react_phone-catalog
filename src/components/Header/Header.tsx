import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from '../Nav/Nav';
import favourites from '../../images/Header/Favourites.svg';
import cart from '../../images/Header/Shopping.svg';
import burger from '../../images/Header/burger-menu.svg';
import Logo from '../Logo/Logo';

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = window.innerHeight * 0.1;

      if (scrollPosition > scrollThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      <Logo />

      <Nav />

      <div className="header__menu">
        <ul className="header__list">
          <li className="header__item">
            <NavLink to="/favourites" className="header__link">
              <img
                src={favourites}
                alt="favourites"
                className="header__link-img header__link-img--favourites"
              />
            </NavLink>
          </li>

          <li className="header__item">
            <NavLink to="/cart" className="header__link">
              <img
                src={cart}
                alt="cart"
                className="header__link-img header__link-img--shopping"
              />
            </NavLink>
          </li>

          <li className="header__item">
            <NavLink to="/menu" className="header__link">
              <img
                src={burger}
                alt="burger-menu"
                className="header__link-img header__link-img--burger"
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
