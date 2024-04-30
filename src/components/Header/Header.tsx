import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from '../Nav/Nav';
import favouritesImg from '../../images/Header/Favourites.svg';
import cartImg from '../../images/Header/Shopping.svg';
import burger from '../../images/Header/burger-menu.svg';
import Logo from '../Logo/Logo';
import Close from '../../images/Header/Close.svg';
import { useProduct } from '../../store/Store';

type Props = {
  setIsOpen: (type: boolean) => void;
  isOpen: boolean;
};

const Header: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  const [isSticky, setIsSticky] = useState(false);

  const { cart, favourites } = useProduct();

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
          {isOpen ? (
            <NavLink
              to="/menu"
              className="header__link"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={Close}
                alt="burger-menu"
                className="header__link-img header__link-img--close"
              />
            </NavLink>
          ) : (
            <NavLink
              to="/menu"
              className="header__link"
              onClick={() => setIsOpen(true)}
            >
              <img
                src={burger}
                alt="burger-menu"
                className="header__link-img header__link-img--burger"
              />
            </NavLink>
          )}
        </ul>
      </div>

      <Nav />

      <div className="header__menu">
        <ul className="header__list">
          <li className="header__item">
            <NavLink to="/favourites" className="header__link">
              <img
                src={favouritesImg}
                alt="favourites"
                className="header__link-img header__link-img--favourites"
              />
            </NavLink>

            {favourites.length > 0 && (
              <span className="header__counter">{favourites.length}</span>
            )}
          </li>

          <li className="header__item">
            <NavLink to="/cart" className="header__link">
              <img
                src={cartImg}
                alt="cart"
                className="header__link-img header__link-img--shopping"
              />
            </NavLink>

            {cart.length > 0 && (
              <span className="header__counter">{cart.length}</span>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
