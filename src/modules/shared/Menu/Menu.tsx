import React, { useContext, useEffect, useCallback } from 'react';
import './Menu.scss';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../context/GlobalContext';
import { navLinks } from '../../../constants/navLinks';

const MOBILE_BREAKPOINT = 640;

export const Menu: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useContext(GlobalContext);

  const handleResize = useCallback(() => {
    if (window.innerWidth > MOBILE_BREAKPOINT && isMenuOpen) {
      toggleMenu();
    }
  }, [isMenuOpen, toggleMenu]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleLinkClick = useCallback(() => {
    if (isMenuOpen) {
      toggleMenu();
    }
  }, [isMenuOpen, toggleMenu]);

  return (
    <nav className={`menu ${isMenuOpen ? 'menu--open' : ''}`}>
      <ul className="menu__list" role="list">
        {navLinks.map(link => (
          <li key={link.title} className="menu__item">
            <Link
              to={link.path}
              className="menu__link"
              onClick={handleLinkClick}
              aria-label={`Navigate to ${link.title}`}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
