import './Header.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Обробка скролу для зміни стилю хедера
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокування скролу body, коли меню відкрите
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // ФУНКЦІЯ ДЛЯ ЗАКРИТТЯ МЕНЮ
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav>
        <div className="nav-left">
          {/* При кліку на лого теж закриваємо меню */}
          <NavLink to="/" onClick={closeMenu}>
            <img src="./img/Logo.svg" alt="Logo" className="logo" />
          </NavLink>

          {/* Desktop & Mobile Links */}
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li>
              <NavLink to="/" className="nav-link" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/phones" className="nav-link" onClick={closeMenu}>
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink to="/tablets" className="nav-link" onClick={closeMenu}>
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink to="/accessories" className="nav-link" onClick={closeMenu}>
                Accessories
              </NavLink>
            </li>
          </ul>

          {/* Burger Menu Button */}
          <div
            className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
          >
            <img
              src={isMenuOpen ? "./img/Close_black.svg" : "./img/Menu.svg"}
              alt="Toggle menu"
            />
          </div>
        </div>

        {/* Icons Group */}
        <div
          className={`button-group-header ${isMenuOpen ? 'mobile-visible' : ''}`}
        >
          <div className="button-group-header-block">
            <NavLink to="/favorites" onClick={closeMenu}>
              <img src="./img/Like.svg" alt="Like" className="like" />
            </NavLink>
          </div>
          <div className="button-group-header-block">
            <NavLink to="/cart" onClick={closeMenu}>
              <img src="./img/Cart.svg" alt="Cart" className="cart" />
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
