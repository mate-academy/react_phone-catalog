import React from 'react';
import styles from './NavMenu.module.scss';
import classNames from 'classnames';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useProducts } from '../../../../context/productsContext';
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingBag} from "react-icons/lu";

type Props = {
  isOpenMenu: boolean;
  setIsOpenMenu: (isOpen: boolean) => void;
};

const links = [
  { id: 1, path: '/', name: 'Home' },
  { id: 2, path: 'phones', name: 'Phones' },
  { id: 3, path: 'tablets', name: 'Tablets' },
  { id: 4, path: 'accessories', name: 'Accessories' },
];

const NavMenu: React.FC<Props> = ({ isOpenMenu, setIsOpenMenu }) => {
  const { pathname } = useLocation();
  const [searchParam] = useSearchParams();
  const { cartProducts, favorites } = useProducts();

  const getActiveLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.menu__link, {
      [styles.menu__link_active]: isActive,
    });
  };

  const getActiveIcon = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.menu__icon, {
      [styles.menu__icon_active]: isActive,
    });
  };

  return (
    <nav
      className={classNames(styles.menu, {
        [styles.menu_open]: isOpenMenu,
      })}
    >
      <ul className={classNames(styles.menu__list)}>
        {links.map(link => (
          <li key={link.id} className={styles.menu__item}>
            <NavLink
              to={link.path}
              key={link.id}
              onClick={() => setIsOpenMenu(false)}
              className={getActiveLink}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.menu__icons}>
        <NavLink
          to="favourites"
          state={{ prevLocation: pathname, search: searchParam.toString() }}
          className={getActiveIcon}
          onClick={() => setIsOpenMenu(false)}
        >
            <FaRegHeart/>
            {favorites.length > 0 && (
              <span className={styles.menu__count}>{favorites.length}</span>
            )}
        </NavLink>
        <NavLink
          to="cart"
          state={{ prevLocation: pathname, search: searchParam.toString() }}
          className={getActiveIcon}
          onClick={() => setIsOpenMenu(false)}
        >
          <LuShoppingBag/>
            {cartProducts.length > 0 && (
              <span className={styles.menu__count}>{cartProducts.length}</span>
            )}
        </NavLink>
      </div>
    </nav>
  );
};

export default NavMenu;
