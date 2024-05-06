import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import { useProduct } from '../../store/Store';

import burger from '../../images/Header/burger-menu.svg';
import Logo from '../Logo/Logo';
import favouritesImg from '../../images/Header/Favourites.svg';
import cartImg from '../../images/Header/Shopping.svg';
import HeaderLink from '../HeaderLink/HeaderLink';

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  const { totalCount, favourites, setIsOpen, isOpen } = useProduct();

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
      <div className="header__top">
        <Logo />

        <ul className="header__open">
          <button className="header__link header__link-button">
            <img
              src={burger}
              alt="burger-menu"
              className="header__link-img header__link-img--burger"
              onClick={() => setIsOpen(!isOpen)}
            />
          </button>
        </ul>
      </div>

      <Nav />

      <ul className="header__list">
        <li className="header__item">
          <HeaderLink
            to="/favourites"
            imgSrc={favouritesImg}
            alt="Favourites"
            counter={favourites.length}
          />
        </li>

        <li className="header__item">
          <HeaderLink
            to="/cart"
            imgSrc={cartImg}
            alt="Cart"
            counter={totalCount}
          />
        </li>
      </ul>
    </header>
  );
};

export default Header;
