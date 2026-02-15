import { NavLink } from 'react-router-dom';
import { Logo } from '../logo';
import { Nav } from '../nav';
import styles from './top-bar.module.scss';
import { Icon } from '../icons';
import { icons } from '../../constants/icons';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import classNames from 'classnames';

type Props = {
  isMobile: boolean;
};

export const TopBar: React.FC<Props> = ({ isMobile }) => {
  const { openMenu, setOpenMenu, cart, favorites, totalItems } =
    useContext(ProductContext);

  const navActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.button, {
      [styles['button--active']]: isActive,
    });

  return (
    <div className={styles.topBar}>
      {!isMobile && (
        <>
          <div className={styles.topBarContent}>
            <Logo withPaddingLeft />
            <Nav />
          </div>
          <div className={styles.topBarButton}>
            <NavLink to="/favorites" className={navActiveLink}>
              <Icon icon={icons.favorites} />
              {favorites.length > 0 && (
                <span className={styles.quantityCircle}>
                  {favorites.length}
                </span>
              )}
            </NavLink>
            <NavLink to="/cart" className={navActiveLink}>
              <Icon icon={icons.shoppingBag} />
              {cart.length > 0 && (
                <span className={styles.quantityCircle}>{totalItems}</span>
              )}
            </NavLink>
          </div>
        </>
      )}
      {isMobile && (
        <>
          <Logo withPaddingLeft />
          <button
            className={styles.topBarBurgerMenu}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <Icon icon={openMenu ? icons.menuClose : icons.menuOpen} />
          </button>
        </>
      )}
    </div>
  );
};
