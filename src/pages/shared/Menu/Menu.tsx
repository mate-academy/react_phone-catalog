import './Menu.scss';
import { FC, useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { navLinks } from '../../../constants/navLinks';
import { Link } from 'react-router-dom';

export const Menu: FC = () => {
  const { isMenuOpen, toggleMenu } = useContext(GlobalContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640 && isMenuOpen) {
        toggleMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen, toggleMenu]);

  return (
    <nav className={`menu ${isMenuOpen ? 'menu--open' : ''}`}>
      <div className="menu__list">
        {navLinks.map(link => (
          <Link
            to={link.path}
            key={link.title}
            className="menu__link"
            onClick={toggleMenu}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};
