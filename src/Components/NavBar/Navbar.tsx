import styles from './Navbar.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../Store/Store';
import { BurgerMenu } from '../BurgerMenu';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('', {
      [styles.isActive]: isActive,
    });

  const getLinkClassForEnds = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.itemEnd, {
      [styles.isActive]: isActive,
    });

  const { favorite, carts, burgerMenuOpen, setBurgerMenuOpen } =
    useContext(Context);

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <div className={styles.start}>
          <li className={styles.item}>
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink className={getLinkClass} to="/phones">
              Phone
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink className={getLinkClass} to="/tables">
              Tables
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink className={getLinkClass} to="/smart">
              Accessories
            </NavLink>
          </li>
        </div>
        <div className={styles.end}>
          <NavLink className={getLinkClassForEnds} to="/favorites">
            <li>
              <img src="img/icons/favourites_icon.svg" alt="favorites" />
              {/*видалити приставку */}
              {favorite.length !== 0 && (
                <span className={styles.counter}>{favorite.length}</span>
              )}
            </li>
          </NavLink>
          <NavLink className={getLinkClassForEnds} to="/cart">
            <li>
              <img src="img/icons/cart_icon.svg" alt="cart" />
              {carts.length !== 0 && (
                <span className={styles.counter}>{carts.length}</span>
              )}
            </li>
          </NavLink>
        </div>
        <div className={styles.burgerСcontainer}>
          <img
            src="img/icons/Menu.svg"
            alt="burger menu"
            onClick={toggleBurgerMenu}
          />
        </div>
      </ul>
      {burgerMenuOpen && (
        <div className={styles.burgerMenu}>
          <BurgerMenu toggleMenu={toggleBurgerMenu} />
        </div>
      )}
    </nav>
  );
};
