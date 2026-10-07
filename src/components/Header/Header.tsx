import styles from './Header.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useState, useEffect } from 'react';

import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <NavLink to="/">
            <img
              className={styles.header__logo}
              src="/img/icons/logo.svg"
              alt="Logo"
            />
          </NavLink>

          <nav className={styles.header__links}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                classNames(styles.header__link, {
                  [styles['is-active']]: isActive,
                })
              }
            >
              HOME
            </NavLink>

            <NavLink
              to="/phones"
              className={({ isActive }) =>
                classNames(styles.header__link, {
                  [styles['is-active']]: isActive,
                })
              }
            >
              PHONES
            </NavLink>

            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                classNames(styles.header__link, {
                  [styles['is-active']]: isActive,
                })
              }
            >
              TABLETS
            </NavLink>

            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                classNames(styles.header__link, {
                  [styles['is-active']]: isActive,
                })
              }
            >
              ACCESSORIES
            </NavLink>
          </nav>
        </div>

        <div className={styles.header__right}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.header__favorite, {
                [styles['is-active']]: isActive,
              })
            }
          >
            <img src="/img/icons/like.svg" alt="Like" />
            {favorites.length > 0 && (
              <span className={styles.header__badge}>{favorites.length}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.header__cart, {
                [styles['is-active']]: isActive,
              })
            }
          >
            <img src="/img/icons/basket.svg" alt="Basket" />
            {totalCartCount > 0 && (
              <span className={styles.header__badge}>{totalCartCount}</span>
            )}
          </NavLink>

          <button
            type="button"
            className={styles.header__menu}
            onClick={() => setMenuOpen(true)}
          >
            <img src="/img/icons/menu.svg" alt="Menu" />
          </button>
        </div>
      </div>

      <aside
        className={classNames(styles.menu, {
          [styles['menu--open']]: menuOpen,
        })}
      >
        <div className={styles.menu__container}>
          <div className={styles.menu__top}>
            <NavLink to="/" onClick={closeMenu}>
              <img
                src="/img/icons/logo.svg"
                alt="Logo"
                className={styles.menu__logo}
              />
            </NavLink>

            <button
              type="button"
              className={styles.menu__close}
              onClick={closeMenu}
            >
              <img src="/img/icons/close.svg" alt="Close menu" />
            </button>
          </div>

          <div className={styles.menu__bottom}>
            <nav className={styles.menu__nav}>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  classNames(styles.menu__link, {
                    [styles['is-active']]: isActive,
                  })
                }
                onClick={closeMenu}
              >
                HOME
              </NavLink>

              <NavLink
                to="/phones"
                onClick={closeMenu}
                className={({ isActive }) =>
                  classNames(styles.menu__link, {
                    [styles['is-active']]: isActive,
                  })
                }
              >
                PHONES
              </NavLink>

              <NavLink
                to="/tablets"
                onClick={closeMenu}
                className={({ isActive }) =>
                  classNames(styles.menu__link, {
                    [styles['is-active']]: isActive,
                  })
                }
              >
                TABLETS
              </NavLink>

              <NavLink
                to="/accessories"
                onClick={closeMenu}
                className={({ isActive }) =>
                  classNames(styles.menu__link, {
                    [styles['is-active']]: isActive,
                  })
                }
              >
                ACCESSORIES
              </NavLink>
            </nav>

            <nav className={styles.menu__actions}>
              <NavLink
                to="/favorites"
                onClick={closeMenu}
                className={({ isActive }) =>
                  classNames(styles.menu__favorite, {
                    [styles['is-active']]: isActive,
                  })
                }
              >
                <img src="/img/icons/like.svg" alt="Like" />
                {favorites.length > 0 && (
                  <span className={styles.menu__badge}>{favorites.length}</span>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                onClick={closeMenu}
                className={({ isActive }) =>
                  classNames(styles.menu__cart, {
                    [styles['is-active']]: isActive,
                  })
                }
              >
                <img src="/img/icons/basket.svg" alt="Basket" />
                {totalCartCount > 0 && (
                  <span className={styles.menu__badge}>{totalCartCount}</span>
                )}
              </NavLink>
            </nav>
          </div>
        </div>
      </aside>
    </header>
  );
};
