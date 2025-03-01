import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './BurgerMenu.scss';

export const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="template">
      <section
        id="burger-menu"
        className={`burger-menu ${isOpen ? 'close' : ''}`}
        onClick={toggleMenu}
      >
        <img
          src={isOpen ? '../../../img/icons/Close.png' : '../../../img/icons/Menu.png'}
          alt={isOpen ? 'Close menu' : 'Open menu'}
        />
      </section>
      <section id="menu" className={`overlay ${isOpen ? 'open' : ''}`}>
        <section className="overlay__header">
          <img src="../../../img/icons/Logo.png" alt="Logo" className="overlay__logo" />
          <div id="close-menu" className="overlay__close" onClick={toggleMenu}>
            <img src="../../../img/icons/Close.png" alt="Close menu" />
          </div>
        </section>
        <nav className="nav-bar">
          <NavLink
            to="/home"
            className={({ isActive }) => `nav-bar__link ${isActive ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) => `nav-bar__link ${isActive ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) => `nav-bar__link ${isActive ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) => `nav-bar__link ${isActive ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            Accessories
          </NavLink>

          <div className="nav-bar__items" onClick={toggleMenu}>
            <Link to="/favourites" className="nav-bar__favourites">
              <img
                src="../../../img/icons/Favourites (Heart Like).png"
                alt="Favourites"
                className="nav-bar__favourites-img"
              />
            </Link>
            <Link to="/cart" className="nav-bar__cart">
              <img
                src="../../../img/icons/Shopping bag (Cart).png"
                alt="Cart"
                className="nav-bar__cart-img"
              />
            </Link>
          </div>
        </nav>
      </section>
    </div>
  );
};
