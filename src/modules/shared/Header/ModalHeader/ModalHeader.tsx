import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { RootState } from '../../../../app/store';
import styles from './ModalHeader.module.scss';

type Props = {
  onClose: () => void;
  isModal: boolean;
};

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const ModalHeader: React.FC<Props> = ({ onClose, isModal }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favouritesItem = useSelector(
    (state: RootState) => state.favourites.items,
  );

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isModal ? 'hidden' : '';
  }, [isModal]);

  useEffect(() => {
    if (isModal) {
      setIsVisible(true);

      return;
    }

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [isModal]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={classNames(
        styles.header_container,
        isModal ? styles.opening : styles.closing,
      )}
    >
      <nav className={styles.header}>
        <ul className={styles.header_list}>
          {navLinks.map(({ to, label }) => (
            <li key={to} className={styles.header_item} onClick={onClose}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  classNames(styles.header_link, {
                    [styles.is_active]: isActive,
                  })
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.header_icons}>
        <NavLink
          to={'favourites'}
          className={styles.header_favorites}
          onClick={onClose}
        >
          <span className={styles.header_heartIcon}>
            {favouritesItem.length > 0 && (
              <span className={styles.header_countIcon}>
                {favouritesItem.length}
              </span>
            )}
          </span>
        </NavLink>
        <NavLink to={'cart'} className={styles.header_cart} onClick={onClose}>
          <span className={styles.header_cartIcon}>
            {cartItems.length > 0 ? (
              <span className={styles.header_countIcon}>
                {cartItems.length}
              </span>
            ) : null}
          </span>
        </NavLink>
      </div>
    </div>
  );
};
