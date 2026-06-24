import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { useFavourites } from '../../../hooks/useFavourites';
import { navigation } from '../../../store/constants';
import { useLocation } from 'react-router-dom';
import { imageUrl } from '../../../utils/imageUrl';
import styles from './Header.module.scss';
import { scrollToTop } from '../../../utils/scrollToTop';
import { useOrder } from '../../../hooks/useOrder';
import { useTheme } from '../../../hooks/useTheme';

export const Header = () => {
  const { favourites } = useFavourites();
  const { cart } = useCart();
  const { order } = useOrder();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [showBurger, setShowBurger] = useState<boolean>(false);

  useEffect(() => {
    if (showBurger) {
      document.body.classList.add('locked');
    } else {
      document.body.classList.remove('locked');
    }
  }, [showBurger]);

  useEffect(() => {
    setShowBurger(false);
    scrollToTop();
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <NavLink to="/" className={styles.logo__link}>
            <img
              src={
                theme === 'dark'
                  ? imageUrl('icons/Logo_white.svg')
                  : imageUrl('icons/Logo.svg')
              }
              alt=""
              className={styles.logo__img}
            />
          </NavLink>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            {navigation.map((item, index) => {
              return (
                <li key={index} className={styles.nav__item}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/catalog'}
                    className={({ isActive }) =>
                      classNames(styles.nav__link, {
                        [styles.nav__link_active]: isActive,
                      })
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={styles.buttons}>
          <div className={classNames(styles.block)}>
            <button onClick={toggleTheme} className={styles.block__link}>
              <img
                src={
                  theme === 'dark'
                    ? imageUrl('icons/Moon.svg')
                    : imageUrl('icons/Sun.svg')
                }
                alt=""
                className={styles.block__img}
              />
            </button>
          </div>
          {order.orderId && (
            <div className={classNames(styles.block)}>
              <NavLink
                to={`/cart/${order.orderId}`}
                className={({ isActive }) =>
                  classNames(styles.block__link, {
                    [styles.block__link_active]: isActive,
                  })
                }
              >
                $
              </NavLink>
            </div>
          )}
          <div className={classNames(styles.block, styles.block__hidden)}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                classNames(styles.block__link, {
                  [styles.block__link_active]: isActive,
                })
              }
            >
              <img
                src={
                  theme === 'dark'
                    ? imageUrl('icons/Favourites_white.svg')
                    : imageUrl('icons/Favourites.svg')
                }
                alt=""
                className={styles.block__img}
              />
              {favourites.length > 0 && (
                <span className={styles.block__link_fav}>
                  {favourites.length}
                </span>
              )}
            </NavLink>
          </div>
          <div className={classNames(styles.block, styles.block__hidden)}>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                classNames(styles.block__link, {
                  [styles.block__link_active]: isActive,
                })
              }
            >
              <img
                src={
                  theme === 'dark'
                    ? imageUrl('icons/Shopping_Cart_white.svg')
                    : imageUrl('icons/Shopping_Cart.svg')
                }
                alt=""
                className={styles.block__img}
              />
              {cart.length > 0 && (
                <span className={styles.block__link_fav}>{cart.length}</span>
              )}
            </NavLink>
          </div>
          <div className={classNames(styles.block, styles.block__burger)}>
            <button
              type="button"
              className={classNames(styles.button, {
                [styles.active]: showBurger,
              })}
              onClick={() => setShowBurger(!showBurger)}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={classNames(styles.menu, {
          [styles.menu__active]: showBurger,
        })}
      >
        <nav className={styles.menu__nav}>
          <ul className={styles.menu__list}>
            {navigation.map((item, index) => {
              return (
                <li key={index} className={styles.menu__list_item}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/catalog'}
                    className={({ isActive }) =>
                      classNames(styles.menu__list_link, {
                        [styles.menu__list_link_active]: isActive,
                      })
                    }
                  >
                    <span className={styles.menu__list_text}>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={styles.menu__footer}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              classNames(styles.menu__link, {
                [styles.menu__link_active]: isActive,
              })
            }
          >
            <div className={styles.menu__link_group}>
              <img
                src={
                  theme === 'dark'
                    ? imageUrl('icons/Favourites_white.svg')
                    : imageUrl('icons/Favourites.svg')
                }
                alt="favourites"
                className={styles.menu__img}
              />
              {favourites.length > 0 && (
                <span className={styles.menu__link_count}>
                  {favourites.length}
                </span>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.menu__link, {
                [styles.menu__link_active]: isActive,
              })
            }
          >
            <div className={styles.menu__link_group}>
              <img
                src={
                  theme === 'dark'
                    ? imageUrl('icons/Shopping_Cart_white.svg')
                    : imageUrl('icons/Shopping_Cart.svg')
                }
                alt="cart"
                className={styles.menu__img}
              />
              {cart.length > 0 && (
                <span className={styles.menu__link_count}>{cart.length}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
