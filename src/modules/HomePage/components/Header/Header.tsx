import { Link, NavLink } from 'react-router-dom';
import styles from '../Header/Header.module.scss';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../../../../CartContext';
import { FavouritesContext } from '../../../../FavouritesContext';

const images = [
  'img/banner-accessories.png',
  'img/banner-phones.png',
  'img/banner-tablets.png',
];

export const Header: React.FC = () => {
  const cartContext = React.useContext(CartContext);
  const favouritesContext = React.useContext(FavouritesContext);
  const [indexOfImg, setIndexOfImg] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { items } = cartContext;
  const { favItems } = favouritesContext;

  const location = useLocation();
  const isHome = location.pathname.endsWith('/');

  const prev = () => {
    setIndexOfImg((i: number) => {
      return i === 0 ? images.length - 1 : i - 1;
    });
  };

  const next = () => {
    setIndexOfImg((i: number) => {
      return i === images.length - 1 ? 0 : i + 1;
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    const threshold = 50;

    if (diff > threshold) {
      next();
    }

    if (diff < -threshold) {
      prev();
    }

    setTouchStartX(null);
  };

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const interval = setInterval(() => {
      setIndexOfImg(pr => (pr === images.length - 1 ? 0 : pr + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isHome]);

  const quantityCart = () => {
    let quant = 0;

    items.map(item => {
      quant += item.quantity;
    });

    return quant;
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__top}>
          <Link to="#logo" className={styles.logo}>
            <img
              src="img/logo/logo.png"
              className={styles.logo_img}
              alt="logo"
            />
          </Link>

          <div className={styles.container}>
            <nav className={`${styles.nav} ${styles['nav--display-none']}`}>
              <ul
                className={`${styles.nav_list} ${styles['nav_list--header']}`}
              >
                <li
                  className={`${styles.nav_item} ${styles['nav_item--header']}`}
                >
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${styles.nav__link} ${isActive ? styles['is-active'] : ''}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li
                  className={`${styles.nav_item} ${styles['nav_item--header']}`}
                >
                  <NavLink
                    className={({ isActive }) =>
                      `${styles.nav__link} ${isActive ? styles['is-active'] : ''}`
                    }
                    to="/phones"
                    id="phones"
                  >
                    Phones
                  </NavLink>
                </li>
                <li
                  className={`${styles.nav_item} ${styles['nav_item--header']}`}
                >
                  <NavLink
                    className={({ isActive }) =>
                      `${styles.nav__link} ${isActive ? styles['is-active'] : ''}`
                    }
                    to="/tablets"
                    id="tablets"
                  >
                    Tablets
                  </NavLink>
                </li>
                <li
                  className={`${styles.nav_item} ${styles['nav_item--header']}`}
                >
                  <NavLink
                    className={({ isActive }) =>
                      `${styles.nav__link} ${isActive ? styles['is-active'] : ''}`
                    }
                    to="/accessories"
                    id="accessories"
                  >
                    Accessories
                  </NavLink>
                </li>
              </ul>
            </nav>

            <button
              type="button"
              className={`${styles.header__icon} ${
                isMenuOpen
                  ? styles['header__icon--close']
                  : styles['header__icon--menu']
              }`}
              onClick={() => setIsMenuOpen(p => !p)}
            />
          </div>

          <div className={styles.header__icons}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                `${styles.header__icon}
                  ${styles['header__icon--favourites']}
                  ${isActive ? styles['icon-active'] : ''}`
              }
            >
              <div className={styles['header__icon-wrapper']}>
                {favItems.length > 0 && (
                  <div className={styles['fav-quantity']}>
                    {favItems.length}
                  </div>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.header__icon}
                  ${styles['header__icon--cart']}
                  ${isActive ? styles['icon-active'] : ''}`
              }
            >
              <div className={styles['header__icon-wrapper']}>
                {items.length > 0 && (
                  <div className={styles['cart-quantity']}>
                    {quantityCart()}
                  </div>
                )}
              </div>
            </NavLink>
          </div>
        </div>

        {isHome && (
          <div className={styles.wrapper}>
            <div className={styles.header__bottom}>
              <h2 className={styles.header__bottom_title}>
                Welcome to Nice <br className={styles['title-break']} /> Gadgets
                store!
              </h2>

              <div className={styles.header__bottom_banner}>
                <div
                  className={styles.header__bottom_carousele}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <button
                    className={styles.header__bottom_slider}
                    onClick={prev}
                  >
                    <img
                      src="img/icons/slider_button_left.png"
                      alt="slider-left"
                    />
                  </button>

                  <img
                    className={styles.header__bottom_carousele_img}
                    src={images[indexOfImg]}
                    alt="banner"
                  />

                  <button
                    className={styles.header__bottom_slider}
                    onClick={next}
                  >
                    <img
                      src="img/icons/slider_button_right.png"
                      alt="slider-right"
                    />
                  </button>
                </div>

                <div className={styles.header__bottom_switches}>
                  {indexOfImg === 0 ? (
                    <img
                      src="img/icons/banner_carousele_active.png"
                      alt="switch"
                    />
                  ) : (
                    <img src="img/icons/banner_carousele.png" alt="switch" />
                  )}
                  {indexOfImg === 1 ? (
                    <img
                      src="img/icons/banner_carousele_active.png"
                      alt="switch"
                    />
                  ) : (
                    <img src="img/icons/banner_carousele.png" alt="switch" />
                  )}
                  {indexOfImg === 2 ? (
                    <img
                      src="img/icons/banner_carousele_active.png"
                      alt="switch"
                    />
                  ) : (
                    <img src="img/icons/banner_carousele.png" alt="switch" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <aside
        className={`${styles.menu} ${isMenuOpen ? styles['menu--open'] : ''}`}
        id={'menu'}
      >
        <div className={styles.menu__top}>
          <Link to="#logo" className={styles.logo}>
            <img
              src="img/logo/logo.png"
              className={styles.logo_img}
              alt="logo"
            />
          </Link>

          <button
            className={styles['menu__icon--close']}
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
        <div className={styles.menu__middle}>
          <nav className={styles.nav}>
            <ul className={`${styles.nav_list} ${styles['nav_list--aside']}`}>
              <li className={`${styles.nav_item} ${styles['nav_item--aside']}`}>
                <NavLink
                  className={styles.nav__link}
                  to="/"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li className={`${styles.nav_item} ${styles['nav_item--aside']}`}>
                <NavLink
                  className={styles.nav__link}
                  to="/phones"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  Phones
                </NavLink>
              </li>
              <li className={`${styles.nav_item} ${styles['nav_item--aside']}`}>
                <NavLink
                  className={styles.nav__link}
                  to="/tablets"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  Tablets
                </NavLink>
              </li>
              <li className={`${styles.nav_item} ${styles['nav_item--aside']}`}>
                <NavLink
                  className={styles.nav__link}
                  to="/accessories"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.menu__bottom}>
            <div className={styles.header__icons}>
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  `${styles.header__icon}
                  ${styles['header__icon--favourites']}
                  ${styles['header__icon--favourites--aside']}
                  ${styles['header__icon--aside']}
                  ${isActive ? styles['icon-active'] : ''}`
                }
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <div className={styles['header__icon-wrapper']}>
                  {favItems.length > 0 && (
                    <div
                      className={`${styles['fav-quantity']} ${styles['fav-quantity--aside']}`}
                    >
                      {favItems.length}
                    </div>
                  )}
                </div>
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `${styles.header__icon}
                  ${styles['header__icon--cart']}
                  ${styles['header__icon--aside']}
                  ${isActive ? styles['icon-active'] : ''}`
                }
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <div className={styles['header__icon-wrapper']}>
                  {items.length > 0 && (
                    <div
                      className={`${styles['cart-quantity']} ${styles['cart-quantity--aside']}`}
                    >
                      {quantityCart()}
                    </div>
                  )}
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
