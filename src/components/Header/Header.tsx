import { Link, NavLink } from 'react-router-dom';
import Logo from '../Logo';
import style from './Header.module.scss';
import { useState } from 'react';
import BurgerMenu from '../BurgerMenu';
import { useAppSelector } from '../../redux/hooks';

const Header = () => {
  const { cart } = useAppSelector(state => state.cart);
  const { favorites } = useAppSelector(state => state.favorites);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? style.active : '';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  return (
    <header id="header" className={style.header}>
      <div className={style.left}>
        <Logo />

        <nav className={style.nav}>
          <ul>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/phones" className={activeLink}>
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink to="/tablets" className={activeLink}>
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink to="/accessories" className={activeLink}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <Link to="/favorite" className={`${style.btn} ${style.favorites}`}>
          <img src="./img/icons/favorites.svg" alt="Favorites" />
          {favorites.length !== 0 && (
            <span className={style.counter}>{favorites.length}</span>
          )}
        </Link>

        <Link to="/cart" className={`${style.btn} ${style.bag}`}>
          <img src="./img/icons/bag.svg" alt="Bag" />
          {cart.length !== 0 && (
            <span className={style.counter}>{cart.length}</span>
          )}
        </Link>

        <button className={`${style.btn} ${style.burger}`} onClick={toggleMenu}>
          <img src="./img/icons/burger.svg" alt="Menu" />
        </button>
      </div>

      {isMenuOpen && (
        <BurgerMenu isMenuOpen={isMenuOpen} onClose={toggleMenu} />
      )}
    </header>
  );
};

export default Header;
