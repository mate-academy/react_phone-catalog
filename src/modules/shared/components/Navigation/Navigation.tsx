import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import * as uiAction from '../../../../app/store/slices/uiSlice';
import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.scss";

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.ui.isOpenNav);
  const cartProducts = useAppSelector((state) => state.cart.items);
  const favouritesProduct = useAppSelector((state) => state.favourites.items);

  const totalQuantity = cartProducts.reduce((sum, item) => sum + item.quantity, 0);

  const handleCloseMobileNav = () => {
    dispatch(uiAction.openModal(false));
  };

  return (
    <nav className={styles.navigation} data-open={isOpen}>
      <ul className={styles.navigationList}>
        <li className={styles.navigationItem}>
          <NavLink to="/" className={getLinkClass} onClick={handleCloseMobileNav}>
            Home
          </NavLink>
        </li>
        <li className={styles.navigationItem}>
          <NavLink to="/phones" className={getLinkClass} onClick={handleCloseMobileNav}>
            Phones
          </NavLink>
        </li>
        <li className={styles.navigationItem}>
          <NavLink to="/tablets" className={getLinkClass} onClick={handleCloseMobileNav}>
            Tablets
          </NavLink>
        </li>
        <li className={styles.navigationItem}>
          <NavLink to="/accessories" className={getLinkClass} onClick={handleCloseMobileNav}>
            Accessories
          </NavLink>
        </li>
      </ul>

      <div className={styles.navigationButtonsRight}>
        <div className={styles.navigationButton}>
          {favouritesProduct.length > 0 && (
            <span className={styles.navigationButtonCount}>
              {favouritesProduct.length}
            </span>
          )}
          <NavLink to="/favourites" className={getLinkClass} onClick={handleCloseMobileNav}>
            <img src="src/assets/icons/favourites-heart.svg" alt="Heart" />
          </NavLink>
        </div>
        <div className={styles.navigationButton}>
          {cartProducts.length > 0 && (
            <span className={styles.navigationButtonCount}>
              {totalQuantity}
            </span>
          )}
          <NavLink to="/cart" className={getLinkClass} onClick={handleCloseMobileNav}>
            <img src="src/assets/icons/shopping-bag-(cart).svg" alt="Bag" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navigationLink, {
    [styles.navigationLinkActive]: isActive,
  });
