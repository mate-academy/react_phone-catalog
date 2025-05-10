import { NavLink } from 'react-router-dom';
import FavouritesIcon from '../FavouritesIcon/FavouritesIcon';
import CartIcon from '../CartIcon/CartIcon';
import styles from './NavIcons.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Product } from '../../types/product';

interface NavIconsProps {
  isBurgerMenu?: boolean;
}

const NavIcons = ({ isBurgerMenu = false }: NavIconsProps) => {
  const IconsClass = isBurgerMenu ? styles.burger__icons : styles.navbar__icons;
  const IconClass = isBurgerMenu ? styles.burger__icon : styles.navbar__icon;
  const [favouriteLength, setFavouriteLength] = useState(0);
  const favouritesStore = useSelector(
    (state: RootState) => state.favouriteProducts.length,
  );
  const [totalQuantity, setTotalQuantity] = useState(0);
  const cartProducts = useSelector((state: RootState) => state.cartProducts);

  useEffect(() => {
    const favouritesRaw = localStorage.getItem('favourites');
    const favourites = favouritesRaw ? JSON.parse(favouritesRaw) || [] : null;

    if (favourites) {
      setFavouriteLength(favourites.length);
    }
  }, [favouritesStore]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart') || '[]';
    const parsedCart = JSON.parse(storedCart);

    if (storedCart) {
      try {
        const calculatedTotal = parsedCart.reduce(
          (acc: number, item: Product) => {
            if (item.quantity !== undefined) {
              return acc + item.quantity;
            } else {
              return acc;
            }
          },
          0,
        );

        setTotalQuantity(calculatedTotal);
      } catch (e) {}
    }
  }, [cartProducts]);

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
            <div
              className={`${styles.navbar__countBadge} ${styles['navbar__countBadge--favourites']}`}
            >
              {favouriteLength}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={`${IconClass} ${styles['navbar__icon--right']}`}
          >
            <CartIcon />
            <div
              className={`${styles.navbar__countBadge} ${styles['navbar__countBadge--cart']}`}
            >
              {totalQuantity}
            </div>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default NavIcons;
