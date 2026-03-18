import './Header.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // для бургер-меню

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
   <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
  <nav>
    <div className="nav-left">
      <NavLink to="/">
        <img src="./img/Logo.svg" alt="Logo" className="logo" />
      </NavLink>

      {/* Desktop Links */}
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/phones" className="nav-link">
            Phones
          </NavLink>
        </li>
        <li>
          <NavLink to="/tablets" className="nav-link">
            Tablets
          </NavLink>
        </li>
        <li>
          <NavLink to="/accessories" className="nav-link">
            Accessories
          </NavLink>
        </li>
      </ul>

      {/* Burger Menu */}
      <div
        className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <img src="./img/Menu.svg" alt="Menu"/>
      </div>
    </div>

    {/* Кнопки кошика та лайка */}
    <div className={`button-group-header ${isMenuOpen ? 'mobile-visible' : ''}`}>
      <div className="button-group-header-block">
        <NavLink to="/favorites">
          <img src="./img/Like.svg" alt="Like" className="like" />
        </NavLink>
      </div>
      <div className="button-group-header-block">
        <NavLink to="/cart">
          <img src="./img/Cart.svg" alt="Cart" className="cart" />
        </NavLink>
      </div>
    </div>
  </nav>
</header>
  );
}

export default Header;
