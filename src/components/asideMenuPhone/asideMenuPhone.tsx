import { NavLink } from 'react-router-dom';
import styles from './asideMenuPhone.module.scss';
import classNames from 'classnames';
import { NavBar } from '../navBar';
import { FaRegHeart } from 'react-icons/fa6';
import { FiShoppingBag } from 'react-icons/fi';
import { Count } from '../countFavorite/cart/count';
export const AsideMenuPhone = ({
  favouriteItems,
  cartItemsCount,
  setActiveAsside,
  getLinkClass,
}) => {
  return (
    <aside
      className={styles.menu}
      id="menu"
      onClick={() => setActiveAsside(false)}
    >
      <NavBar getLinkClass={getLinkClass} types={'asideMenu'} />

      <div
        className={styles.menu__bottom}
        onClick={() => setActiveAsside(false)}
      >
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            classNames(styles.buttonWrapper, {
              [styles['is-active']]: isActive,
            })
          }
        >
          <div className={styles.wrapper}>
            <FaRegHeart className={styles['visible--mobile']} />
            {favouriteItems.length < 0 && (
              <Count count={favouriteItems} type={'aside'} />
            )}
          </div>
        </NavLink>

        <div className={styles.divider}></div>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames(styles.buttonWrapper, {
              [styles['is-active']]: isActive,
            })
          }
        >
          <div className={styles.wrapper}>
            <FiShoppingBag className={styles['visible--mobile']} />
            {cartItemsCount > 0 && (
              <Count count={cartItemsCount} type={'aside'} />
            )}
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
