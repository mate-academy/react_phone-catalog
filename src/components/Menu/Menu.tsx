import classNames from 'classnames';
import styles from './Menu.module.scss';
import { PageLinks } from '../../types/PageLinks';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

export const Menu = () => {
  const { activeLink, favourites, cart } = useContext(AppContext)!;

  return (
    <>
      <aside className={`${styles.menu} ${styles.page__menu}`} id="menu">
        <div className="container">
          <div className={styles.menu__linksContainer}>
            <NavLink
              to="/"
              className={classNames(styles.menu__link, {
                [styles.menu__linkActive]: activeLink === PageLinks.HOME,
              })}
            >
              Home
            </NavLink>

            <NavLink
              to="../phones"
              className={classNames(styles.menu__link, {
                [styles.menu__linkActive]: activeLink === PageLinks.PHONES,
              })}
            >
              Phones
            </NavLink>

            <NavLink
              to="tablets"
              className={classNames(styles.menu__link, {
                [styles.menu__linkActive]: activeLink === PageLinks.TABLETS,
              })}
            >
              Tablets
            </NavLink>

            <NavLink
              to="accessories"
              className={classNames(styles.menu__link, {
                [styles.menu__linkActive]: activeLink === PageLinks.ACCESSORIES,
              })}
              // onClick={() => handlePageLinkClick(PageLinks.ACCESSORIES)}
            >
              Accessories
            </NavLink>
          </div>
        </div>

        <div className={styles.menu__buttonsContainer}>
          <NavLink
            to="favourites"
            className={classNames(
              styles.menu__button,
              styles.menu__favourites,
              {
                [styles.menu__linkActive]: activeLink === PageLinks.FAVOURITES,
              },
            )}
          >
            {favourites.length > 0 && (
              <span className={styles.menu__count}>{favourites.length}</span>
            )}
          </NavLink>

          <NavLink
            to="cart"
            className={classNames(styles.menu__button, styles.menu__cart, {
              [styles.menu__linkActive]: activeLink === PageLinks.CART,
            })}
          >
            {cart.length > 0 && (
              <span className={styles.menu__count}>{cart.length}</span>
            )}
          </NavLink>
        </div>
      </aside>
    </>
  );
};
