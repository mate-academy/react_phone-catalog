import { NavLink } from 'react-router-dom';
import FavouritesIcon from '../FavouritesIcon/FavouritesIcon';
import CartIcon from '../CartIcon/CartIcon';
import styles from './NavIcons.module.scss';

interface NavIconsProps {
  isBurgerMenu?: boolean;
}

const NavIcons = ({ isBurgerMenu = false }: NavIconsProps) => {
  const IconsClass = isBurgerMenu ? styles.burger__icons : styles.navbar__icons;
  const IconClass = isBurgerMenu ? styles.burger__icon : styles.navbar__icon;

  return (
    <>
      {isBurgerMenu && (
        <div className={styles.burger__container}>
          <div className={IconsClass}>
            {/* Wrap each NavLink with a div when isBurgerMenu is true */}
            <div className={styles['burger__icon-wrapper']}>
              <NavLink to="/favourites" className={IconClass}>
                <FavouritesIcon />
              </NavLink>
            </div>
            <div className={styles['burger__icon-wrapper']}>
              <NavLink
                to="/cart"
                className={`${IconClass} ${styles['navbar__icon--right']}`}
              >
                <CartIcon />
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {!isBurgerMenu && (
        <div className={IconsClass}>
          <NavLink to="/favourites" className={IconClass}>
            <FavouritesIcon />
          </NavLink>
          <NavLink
            to="/cart"
            className={`${IconClass} ${styles['navbar__icon--right']}`}
          >
            <CartIcon />
          </NavLink>
        </div>
      )}
    </>
  );
};

export default NavIcons;
