import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { Logo } from '../Logo/logo';
import { getClassNav } from '../../utils/getLinkClass';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header__nav">
          <Logo />

          <div className="header__nav-list">
            <NavLink to="/" className={getClassNav}>
              Home
            </NavLink>

            <NavLink to="/phones" className={getClassNav}>
              Phones
            </NavLink>

            <NavLink to="/tablets" className={getClassNav}>
              Tablets
            </NavLink>

            <NavLink to="/accessories" className={getClassNav}>
              Accessories
            </NavLink>
          </div>
        </div>

        <div className="header__menu-container">
          <button className="header__icon icon" onClick={toggleMenu}>
            <img src="img/icons/menu.svg" alt="menu" className="icon__img" />
          </button>
        </div>

        <div className="header__icons">
          <button className="header__icon icon">
            <img
              src="img/icons/heart-like.svg"
              alt="favourites"
              className="icon__img"
            />
          </button>
          <button className="header__icon icon">
            <img
              src="img/icons/shopping-bag.svg"
              alt="Shopping bag"
              className="icon__img"
            />
          </button>
        </div>
      </header>
      {menuOpen && <BurgerMenu toggleMenu={toggleMenu} />}
    </>
  );
};
