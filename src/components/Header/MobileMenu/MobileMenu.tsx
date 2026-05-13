import styles from './MobileMenu.module.scss';
import favorites from '../../../assets/icons/Favourites.svg';
import shoppingBag from '../../../assets/icons/ShoppingBag.svg';
import { NavLink } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { IconWithBadge } from '../../icons/IconWithBadge';
import classNames from 'classnames';
import { cartItemsCount } from '../../../features/utils/selectors';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.items,
  );

  const cartItems = useSelector(cartItemsCount);

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.mobileMenu__navLink, {
      [styles.mobileMenu__navLinkActive]: isActive,
    });

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.mobileMenu__iconLink, {
      [styles.mobileMenu__iconLinkActive]: isActive,
    });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const prev = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div id="mobile-menu" className={styles.mobileMenu}>
      <nav className={styles.mobileMenu__nav}>
        <NavLink to="/" onClick={onClose} className={getNavClass}>
          HOME
        </NavLink>
        <NavLink to="/phones" onClick={onClose} className={getNavClass}>
          PHONES
        </NavLink>
        <NavLink to="/tablets" onClick={onClose} className={getNavClass}>
          TABLETS
        </NavLink>
        <NavLink to="/accessories" onClick={onClose} className={getNavClass}>
          ACCESSORIES
        </NavLink>
      </nav>

      <div className={styles.mobileMenu__bottom}>
        <NavLink to="/favorites" onClick={onClose} className={getIconClass}>
          <IconWithBadge
            icon={favorites}
            alt="favorites"
            badgeCount={favoriteItems.length}
          />
        </NavLink>
        <NavLink to="/cart" onClick={onClose} className={getIconClass}>
          <IconWithBadge
            icon={shoppingBag}
            alt="ShoppingBag"
            badgeCount={cartItems}
          />
        </NavLink>
      </div>
    </div>
  );
};
