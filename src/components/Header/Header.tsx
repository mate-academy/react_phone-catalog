import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${s.navLink} ${isActive ? s.active : ''}`;

  return (
    <header className={`${s.header} ${isScrolled ? s.scrolled : ''}`}>
      <nav className={s.nav}>
        <div className={s.navLeft}>
          <NavLink to="/" onClick={closeMenu}>
            <img src="./img/Logo.svg" alt="Logo" className={s.logo} />
          </NavLink>

          <ul className={`${s.navLinks} ${isMenuOpen ? s.open : ''}`}>
            <li>
              <NavLink to="/" className={getNavLinkClass} onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                className={getNavLinkClass}
                onClick={closeMenu}
              >
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                className={getNavLinkClass}
                onClick={closeMenu}
              >
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                className={getNavLinkClass}
                onClick={closeMenu}
              >
                Accessories
              </NavLink>
            </li>
          </ul>

          <div
            className={`${s.burgerMenu} ${isMenuOpen ? s.open : ''}`}
            onClick={toggleMenu}
          >
            <img
              src={isMenuOpen ? './img/Close_black.svg' : './img/Menu.svg'}
              alt="Toggle menu"
            />
          </div>
        </div>

        <div
          className={`${s.buttonGroupHeader} ${isMenuOpen ? s.mobileVisible : ''}`}
        >
          <div className={s.buttonGroupHeaderBlock}>
            <NavLink
              to="/favorites"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? s.activeIcon : '')}
            >
              <img src="./img/Like.svg" alt="Like" className={s.like} />
            </NavLink>
          </div>
          <div className={s.buttonGroupHeaderBlock}>
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? s.activeIcon : '')}
            >
              <img src="./img/Cart.svg" alt="Cart" className={s.cart} />
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};
