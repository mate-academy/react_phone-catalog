import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import styles from './Navbar.module.scss';
import { useAppContext } from '../../contexts/AppContext';
import { BurgerMenu } from '../BurgerMenu';

export const Navbar: React.FC = () => {
  const { favouriteProductsIds, cartProductsIds, isMenuOpen, setIsMenuOpen } =
    useAppContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Logo location="navbar" />
  
        <ul className={`${styles.list} ${styles.tablet}`}>
          <li className={`${styles.item} uppercaseText`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.activeLink : ''}`
              }
            >
              home
            </NavLink>
          </li>
          <li className={`${styles.item} uppercaseText`}>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.activeLink : ''}`
              }
            >
              phones
            </NavLink>
          </li>
          <li className={`${styles.item} uppercaseText`}>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.activeLink : ''}`
              }
            >
              tablets
            </NavLink>
          </li>
          <li className={`${styles.item} uppercaseText`}>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.activeLink : ''}`
              }
            >
              accessories
            </NavLink>
          </li>
        </ul>

        <div className={`${styles.icons} ${styles.tablet}`}>
          <NavLink
            to={'/favorites'}
            className={({ isActive }) =>
              `${isActive ? styles.activeLink : ''} ${styles.link}`
            }
          >
            <img className={styles.img} src="./img/icons/Heart.svg" alt="" />

            {favouriteProductsIds.length > 0 && (
              <div className={styles.counter}>
                {favouriteProductsIds.length}
              </div>
            )}
          </NavLink>

          <NavLink
            to={'/cart'}
            className={({ isActive }) =>
              `${isActive ? styles.activeLink : ''} ${styles.link}`
            }
          >
            <img className={styles.img} src="./img/icons/Cart.svg" alt="" />

            {cartProductsIds.length > 0 && (
              <div className={styles.counter}>
                {cartProductsIds.length}
              </div>
            )}
          </NavLink>
        </div>

        <div className={`${styles.icons} ${styles.phone}`}>
          <button
            onClick={toggleMenu}
            className={`
          ${styles.iconContainer} 
          ${styles.item}
        `}
          >
            <img src="/img/icons/burger-menu.svg" alt="Burger menu" />
          </button>
        </div>
      </nav>

      <BurgerMenu onClose={toggleMenu} />
    </>
  );
};
