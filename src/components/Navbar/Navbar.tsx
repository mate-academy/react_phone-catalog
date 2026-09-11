import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useCart } from '../CartContext/CartContext';

export const Navbar: React.FC = () => {
  const { cartItems, likedIds } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = Object.values(cartItems).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <NavLink className={styles.logo} to="/" onClick={closeMenu}>
          <img
            src={`${import.meta.env.BASE_URL}/img/Nice-Gadgets.svg`}
            alt="Logo"
          />
        </NavLink>

        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              HOME
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              PHONES
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              TABLETS
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              ACCESSORIES
            </NavLink>
          </li>
        </ul>
        <button
          type="button"
          className={styles.burger}
          onClick={() => setIsMenuOpen(current => !current)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <img
              className={styles.burgerIcon}
              src={`${import.meta.env.BASE_URL}/img/closeburger.png`}
              alt="closeburger"
            />
          ) : (
            <img
              className={styles.burgerIcon}
              src={`${import.meta.env.BASE_URL}/img/burger.png`}
              alt="burger"
            />
          )}
        </button>
      </div>

      <div className={styles.icons}>
        <NavLink
          className={({ isActive }) =>
            `${styles.iconButton} ${isActive ? styles.active : ''}`
          }
          to="/favourites"
        >
          <img
            src={`${import.meta.env.BASE_URL}/img/heart-like.svg`}
            alt="heart-like"
          />
          {likedIds.size > 0 && (
            <span className={styles.count}>{likedIds.size}</span>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.iconButton} ${isActive ? styles.active : ''}`
          }
          to="/cart"
        >
          <img
            src={`${import.meta.env.BASE_URL}/img/shop-bag.svg`}
            alt="shop-bag"
          />
          {cartCount > 0 && <span className={styles.count}>{cartCount}</span>}
        </NavLink>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileList}>
            <li>
              <NavLink
                to="/"
                end
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.active : ''}`
                }
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.active : ''}`
                }
              >
                PHONES
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.active : ''}`
                }
              >
                TABLETS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.active : ''}`
                }
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>

          <div className={styles.mobileIcons}>
            <NavLink
              to="/favourites"
              onClick={closeMenu}
              className={styles.mobileIconButton}
            >
              <div className={styles.iconWrapper}>
                <img
                  src={`${import.meta.env.BASE_URL}/img/heart-like.svg`}
                  alt="heart-like"
                />
                {likedIds.size > 0 && (
                  <span className={styles.count}>{likedIds.size}</span>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={styles.mobileIconButton}
            >
              <div className={styles.iconWrapper}>
                <img
                  src={`${import.meta.env.BASE_URL}/img/shop-bag.svg`}
                  alt="shop-bag"
                />
                {cartCount > 0 && (
                  <span className={styles.count}>{cartCount}</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};
