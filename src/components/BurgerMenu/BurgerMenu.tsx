import { Link, NavLink } from 'react-router-dom';
import Logo from '../Logo';
import style from './BurgerMenu.module.scss';
import React from 'react';

type Props = {
  isMenuOpen: boolean;
  onClose: () => void;
};

const BurgerMenu: React.FC<Props> = ({ isMenuOpen, onClose }) => {
  const activeLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? style.active : '';

  return (
    <aside className={`${style.burger} ${isMenuOpen ? style.active : ''}`}>
      <header className={style.header}>
        <Logo />

        <button className={`${style.btn} ${style.close}`} onClick={onClose}>
          <img src="./img/icons/close.svg" alt="Close" />
        </button>
      </header>

      <nav className={style.nav}>
        <ul>
          <li>
            <NavLink to="/" className={activeLink} onClick={onClose}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/phones" className={activeLink} onClick={onClose}>
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink to="/tablets" className={activeLink} onClick={onClose}>
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink to="/accessories" className={activeLink} onClick={onClose}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <footer className={style.footer}>
        <Link
          to="/favorite"
          className={`${style.btn} ${style.favorites}`}
          onClick={onClose}
        >
          <img src="./img/icons/favorites.svg" alt="Favorites" />
        </Link>
        <Link
          to="/cart"
          className={`${style.btn} ${style.bag}`}
          onClick={onClose}
        >
          <img src="./img/icons/bag.svg" alt="Bag" />
        </Link>
      </footer>
    </aside>
  );
};

export default BurgerMenu;
