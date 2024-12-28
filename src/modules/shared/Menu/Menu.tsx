import React, { useContext, useEffect } from 'react';
import './Menu.scss';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../store/GlobalContext';
import { navLinks } from '../../../constants/navLinks';

export const Menu: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useContext(GlobalContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640 && isMenuOpen) {
        toggleMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen, toggleMenu]);

  return (
    <nav className="menu">
      <div className="menu__list">
        {navLinks.map(link => (
          <Link to={link.path} key={link.title} className="menu__link">
            {link.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};
