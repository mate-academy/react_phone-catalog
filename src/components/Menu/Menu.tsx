import styles from './Menu.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../Store/Store';
import { Navbar } from '../../enums/Navbar';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.menu__navLink, {
    [styles['is-active']]: isActive,
  });

const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.menu__iconLink, {
    [styles['is-active']]: isActive,
  });

export const Menu = () => {
  const dispatch = useContext(DispatchContext);
  const { favourites } = useContext(StateContext);
  const { cart } = useContext(StateContext);

  return (
    <aside className={styles.menu}>
      <div className={styles.menu__nav}>
        <ul className={styles.menu__navList}>
          {Object.values(Navbar).map(page => (
            <li className={styles.menu__navItem} key={page}>
              <NavLink
                to={page === Navbar.home ? '/' : page}
                className={getNavLinkClass}
                onClick={() => dispatch({ type: 'closeMenu' })}
              >
                {page}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.menu__iconsContainer}>
        <NavLink
          to={'/favourites'}
          className={getIconLinkClass}
          onClick={() => dispatch({ type: 'closeMenu' })}
        >
          <div className={styles.menu__icon}>
            {favourites.length > 0 && (
              <div className={styles.menu__iconAmount}>
                <span className={styles.menu__iconAmountText}>
                  {favourites.length}
                </span>
              </div>
            )}
            <img
              src="/img/icons/favourites-icon.svg"
              alt="Favourites"
              className={styles.menu__iconImage}
            />
          </div>
        </NavLink>
        <NavLink
          to={'/cart'}
          className={getIconLinkClass}
          onClick={() => dispatch({ type: 'closeMenu' })}
        >
          <div className={styles.menu__icon}>
            {cart.length > 0 && (
              <div className={styles.menu__iconAmount}>
                <span className={styles.menu__iconAmountText}>
                  {cart.length}
                </span>
              </div>
            )}
            <img
              src="/img/icons/cart-icon.svg"
              alt="Cart"
              className={styles.menu__iconImage}
            />
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
