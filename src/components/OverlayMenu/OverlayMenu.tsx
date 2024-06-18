import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';
import styles from './OverlayMenu.module.scss';
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const classActiveNavLink = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, {
    [styles.activeLink]: isActive,
  });

const classActiveIcon = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navIcon, {
    [styles.navIconActive]: isActive,
  });

const OverlayMenu: React.FC<Props> = ({ setOpen }) => {
  const { cart, favorites } = useContext(ProductContext);
  const [selectedLink, setSelectedLink] = useState(false);

  if (selectedLink) {
    setOpen(false);
  }

  const handleSetSelected = () => setSelectedLink(true);

  return (
    <div className={styles.menu}>
      <ul className={styles.list}>
        <li className={styles.pageLink}>
          <NavLink
            to="/"
            className={classActiveNavLink}
            onClick={handleSetSelected}
          >
            home
          </NavLink>
        </li>
        <li className={styles.pageLink}>
          <NavLink
            to="/phones"
            className={classActiveNavLink}
            onClick={handleSetSelected}
          >
            phones
          </NavLink>
        </li>
        <li className={styles.pageLink}>
          <NavLink
            to="/tablets"
            className={classActiveNavLink}
            onClick={handleSetSelected}
          >
            tablets
          </NavLink>
        </li>
        <li className={styles.pageLink}>
          <NavLink
            to="/accessories"
            className={classActiveNavLink}
            onClick={handleSetSelected}
          >
            accessories
          </NavLink>
        </li>
      </ul>

      <ul className={styles.icons}>
        <li className={styles.pageIcon}>
          <NavLink
            to="/favorites"
            className={classActiveIcon}
            onClick={handleSetSelected}
          >
            <img src={`${BASE_URL}/icons/Favorites.svg`} alt="Favorites" />
            {favorites.length > 0 && (
              <span className={styles.count}>
                <p className={styles.countText}>{favorites.length}</p>
              </span>
            )}
          </NavLink>
        </li>
        <li className={styles.pageIcon}>
          <NavLink
            to="/cart"
            className={classActiveIcon}
            onClick={handleSetSelected}
          >
            <img src={`${BASE_URL}/icons/Cart.svg`} alt="Cart" />
            {cart.length > 0 && (
              <span className={styles.count}>
                <p className={styles.countText}>{cart.length}</p>
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default OverlayMenu;
