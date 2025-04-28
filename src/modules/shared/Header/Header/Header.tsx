import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { RootState } from '../../../../app/store';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import Logo from '../../../../assets/img/Logo/Logo.png';
import styles from './Header.module.scss';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Header: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isModal, setIsModal] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favoriteItems = useSelector(
    (state: RootState) => state.favourites.items,
  );

  const toggleModal = () => {
    setIsModal(prevState => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 640) {
        setIsModal(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <React.Fragment>
      <header className={styles.header} id="top">
        <div className={styles.header_container}>
          <div className={styles.header_block}>
            <NavLink to="/">
              <img src={Logo} alt="logo" className={styles.header_logo} />
            </NavLink>
            <nav className={styles.header_nav}>
              <ul className={styles.header_list}>
                {navLinks.map(({ to, label }) => (
                  <li key={to} className={styles.header_item}>
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

              <NavLink
                to={'favourites'}
                role="button"
                className={styles.header_favourites}
              >
                <span className={styles.header_heartIcon}>
                  {favoriteItems.length > 0 && (
                    <span className={styles.header_countIcon}>
                      {favoriteItems.length}
                    </span>
                  )}
                </span>
              </NavLink>
              <NavLink to={'cart'} role="button" className={styles.header_cart}>
                <span className={styles.header_cartIcon}>
                  {totalItems > 0 ? (
                    <span className={styles.header_countIcon}>
                      {totalItems}
                    </span>
                  ) : null}
                </span>
              </NavLink>
            </nav>

            <div className={styles.header_modalMenu}>
              <button
                className={classNames(styles.header_icon, {
                  [styles.header_icon_open]: !isModal,
                  [styles.header_icon_close]: isModal,
                })}
                onClick={toggleModal}
                aria-label="Toggle menu"
              ></button>
            </div>
          </div>
        </div>
      </header>

      {windowWidth <= 639 && (
        <ModalHeader onClose={toggleModal} isModal={isModal} />
      )}
    </React.Fragment>
  );
};
