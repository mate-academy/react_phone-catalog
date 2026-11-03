import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Menu.module.scss';
import { useFavourites } from '../../../../context/FavouritesContext';
import { useCart } from '../../../../context/CartContext';

import { useActiveCategory } from '../../../../hooks/useActiveCategory';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  const { favouritesCount } = useFavourites();
  const { totalCount } = useCart();

  const activeCategory = useActiveCategory();

  const getCategoryLinkClass = (categoryName: string) => {
    return ({ isActive }: { isActive: boolean }) => {
      return classNames(styles.navLink, {
        [styles.isActive]: isActive || activeCategory === categoryName,
      });
    };
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.navLink, { [styles.isActive]: isActive });
  };

  const getActionLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.actionsBtn, { [styles.isActive]: isActive });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <aside className={styles.menu}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.logo} onClick={onClose}>
          <img src="./img/icons/logo-dark.svg" alt="Nice Gadgets Logo" />
        </Link>

        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close menu"
        >
          <span className={styles.closeIcon} />
        </button>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink to="/" className={getLinkClass} onClick={onClose}>
              Home
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink
              to="/phones"
              className={getCategoryLinkClass('phones')}
              onClick={onClose}
            >
              Phones
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink
              to="/tablets"
              className={getCategoryLinkClass('tablets')}
              onClick={onClose}
            >
              Tablets
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink
              to="/accessories"
              className={getCategoryLinkClass('accessories')}
              onClick={onClose}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.footer}>
        <NavLink
          to="/favourites"
          className={getActionLinkClass}
          onClick={onClose}
        >
          <div className={styles.iconWrapper}>
            <div className={styles.iconHeart} />

            {favouritesCount > 0 && (
              <span className={styles.badge}>{favouritesCount}</span>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" onClick={onClose} className={getActionLinkClass}>
          <div className={styles.iconWrapper}>
            <div className={styles.iconBag} />

            {totalCount > 0 && (
              <span className={styles.badge}>{totalCount}</span>
            )}
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
