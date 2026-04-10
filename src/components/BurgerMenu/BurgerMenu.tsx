import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useMenu } from '../../hooks/useMenu';
import { useCart } from '../../context/CartContext';
import { Icon } from '../Icon';
import styles from './BurgerMenu.module.scss';

export const BurgerMenu = () => {
  const { isMenuOpen, closeMenu } = useMenu();
  const { cart, favorites } = useCart();
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      setIsAnimationActive(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsAnimationActive(false);
        document.body.style.overflow = 'auto';
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  const handleLinkClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.closest('[data-nav-link]')) {
      closeMenu();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen && window.innerWidth > 768) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, closeMenu]);

  if (!isMenuOpen && !isAnimationActive) {
    return null;
  }

  return (
    <div
      className={classNames(styles.menuWrapper, {
        [styles['menuWrapper--closing']]: !isMenuOpen,
      })}
    >
      <aside onClick={handleLinkClick} className={styles.menu}>
        <nav className={styles.menu__nav}>
          <ul className={styles.menu__list}>
            <li data-nav-link>
              <NavLink to="/" className={styles.menu__link}>
                Home
              </NavLink>
            </li>
            <li data-nav-link>
              <NavLink to="/phones" className={styles.menu__link}>
                Phones
              </NavLink>
            </li>
            <li data-nav-link>
              <NavLink to="/tablets" className={styles.menu__link}>
                Tablets
              </NavLink>
            </li>
            <li data-nav-link>
              <NavLink to="/accessories" className={styles.menu__link}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.menu__icons}>
          <div className={styles.menu__icon} data-nav-link>
            <NavLink to="/favorites">
              <Icon name="favourite" />
              {favorites.length > 0 && (
                <span className={styles.count}>{favorites.length}</span>
              )}
            </NavLink>
          </div>
          <div className={styles.menu__icon} data-nav-link>
            <NavLink to="/cart">
              <Icon name="cart" />
              {cart.length > 0 && (
                <span className={styles.count}>{cart.length}</span>
              )}
            </NavLink>
          </div>
        </div>
      </aside>
    </div>
  );
};
