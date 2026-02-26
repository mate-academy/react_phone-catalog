import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './header.module.scss';
import logoImage from '../../assets/images/Logo-header.png';

import { HeaderMenu } from './header-menu';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { RootState } from '../../app/store';

export const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favoriteItems = useSelector((state: RootState) => state.favorite.items);

  const [isHeaderModalOpen, setIsHeaderModalOpen] =
    React.useState<boolean>(false);

  const toggleModal = () => {
    setIsHeaderModalOpen(prevState => !prevState);
  };

  useEffect(() => {
    if (isHeaderModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isHeaderModalOpen]);

  return (
    <>
      <h1 className={styles.header_title_inv}>Product Catalog</h1>
      <header className={styles.header} id="top">
        <div className={styles.header_cont}>
          <div className={styles.header_div}>
            <NavLink to="/">
              <img src={logoImage} alt="logo" className={styles.header_logo} />
            </NavLink>
            <nav className={styles.header_nav}>
              <ul className={styles.header_list}>
                <li className={styles.header_item}>
                  <NavLink
                    to={'/'}
                    className={({ isActive }) =>
                      classNames(styles.header_link, {
                        [styles.is_active]: isActive,
                      })
                    }
                  >
                    HOME
                  </NavLink>
                </li>
                <li className={styles.header_item}>
                  <NavLink
                    to={'phones'}
                    className={({ isActive }) =>
                      classNames(styles.header_link, {
                        [styles.is_active]: isActive,
                      })
                    }
                  >
                    PHONES
                  </NavLink>
                </li>
                <li className={styles.header_item}>
                  <NavLink
                    to={'tablets'}
                    className={({ isActive }) =>
                      classNames(styles.header_link, {
                        [styles.is_active]: isActive,
                      })
                    }
                  >
                    TABLETS
                  </NavLink>
                </li>
                <li className={styles.header_item}>
                  <NavLink
                    to={'accessories'}
                    className={({ isActive }) =>
                      classNames(styles.header_link, {
                        [styles.is_active]: isActive,
                      })
                    }
                  >
                    ACCESSORIES
                  </NavLink>
                </li>
              </ul>
              <NavLink to={'favorites'} className={styles.header_favorite}>
                <span className={styles.header_icon1}>
                  {favoriteItems.length > 0 ? (
                    <span className={styles.header_icon1_quan}>
                      {favoriteItems.length}
                    </span>
                  ) : null}
                </span>
              </NavLink>
              <Link to={'cart'} className={styles.header_cart}>
                <span className={styles.header_icon2}>
                  {cartItems.length > 0 ? (
                    <span className={styles.header_icon1_quan}>
                      {cartItems.length}
                    </span>
                  ) : null}
                </span>
              </Link>
            </nav>

            <div className={styles.header_menu}>
              <button
                className={classNames(styles.header_icon_open, {
                  [styles.header_icon_close]: isHeaderModalOpen,
                })}
                onClick={toggleModal}
                aria-label="Open header menu"
              ></button>
            </div>
          </div>
        </div>
      </header>

      <HeaderMenu onClose={toggleModal} isHeaderModalOpen={isHeaderModalOpen} />
    </>
  );
};
