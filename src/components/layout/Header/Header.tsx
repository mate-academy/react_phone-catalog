import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { useFavourites } from '../../../hooks/useFavourites';
import { navigation } from '../../../store/constants';
import { imageUrl } from '../../../utils/imageUrl';
import styles from './Header.module.scss';

export const Header = () => {
  const { favourites } = useFavourites();
  const { cart } = useCart();
  const [showBurger, setShowBurger] = useState<boolean>(false);

  useEffect(() => {
    if (showBurger) {
      document.body.classList.add('locked');
    } else {
      document.body.classList.remove('locked');
    }
  }, [showBurger]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <NavLink to="/" className={styles.logo__link}>
            <img
              src={imageUrl('icons/Logo.svg')}
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
                src={imageUrl('icons/Favourites.svg')}
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
                src={imageUrl('icons/Shopping_Cart.svg')}
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
          <Link to="/" className={styles.menu__link}>
            <img
              src={imageUrl('icons/Favourites.svg')}
              alt=""
              className={styles.menu__img}
            />
          </Link>
          <Link to="/" className={styles.menu__link}>
            <img
              src={imageUrl('icons/Shopping_Cart.svg')}
              alt=""
              className={styles.menu__img}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
