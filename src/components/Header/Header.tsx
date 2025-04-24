import React from 'react';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useFavourites } from '../Favourites/FavouritesContext';
import { useCartProducts } from '../Cart/CartContext';
import { useTheme } from '../ThemeContext/ThemeContext';

type Props = {
  setActiveAside: (arg: boolean) => void;
  width: number;
};

const Header: React.FC<Props> = ({ setActiveAside, width }) => {
  const { favourites } = useFavourites();
  const { cartProducts } = useCartProducts();
  const { theme, toggleTheme } = useTheme();

  const totalQuantity = cartProducts.reduce(
    (curr, acc) => (acc.quantity || 1) + curr,
    0,
  );

  const handleActiveLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(`${styles.header_nav_link}`, {
      [styles.active_link]: isActive,
      [styles.active_wrapper]: isActive,
    });
  };

  const handleFavLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(`${styles.header_nav_favourite_button}`, {
      [styles.active_wrapper]: isActive,
      [styles.active_fav_and_shop_wrapper]: isActive,
    });
  };

  const handleCartLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(`${styles.header_nav_favourite_button}`, {
      [styles.active_wrapper]: isActive,
      [styles.active_fav_and_shop_wrapper]: isActive,
    });
  };

  return (
    <>
      {width < 640 && (
        <>
          <nav className={`${styles.header_nav_container}`}>
            <div className={`${styles.header_nav_logo_container}`}>
              <Link to="../">
                <img
                  src={
                    theme === 'light'
                      ? './img/logo/logo-main.svg'
                      : './img/logo/logo-dark-theme.svg'
                  }
                  alt="logo nice gadgets"
                />
              </Link>
            </div>
            <div
              className={`${styles.switch_wrapper} ${styles.switch_cont_on_phone}`}
            >
              <label id="switch" className={`${styles.switch}`}>
                <input
                  type="checkbox"
                  onChange={() => toggleTheme()}
                  id="slider"
                  checked={theme === 'light'}
                  aria-label="Toggle theme"
                />
                <span
                  className={classNames(`${styles.slider} ${styles.round}`)}
                ></span>
              </label>
            </div>

            <div
              className={`${styles.header_nav_burger_container}`}
              onClick={() => {
                setActiveAside(true);
              }}
            >
              <button className={`${styles.header_nav_burger_button}`}>
                <img
                  src={
                    theme === 'light'
                      ? './img/icons/burger-menu-icon.svg'
                      : './img/icons/burger-menu-dark-theme.svg'
                  }
                  alt="burger menu"
                />
              </button>
            </div>
          </nav>
        </>
      )}
      {width >= 640 && (
        <>
          <nav className={`${styles.header_nav_container}`}>
            <div className={`${styles.header_nav_logo_container}`}>
              <Link to="../">
                <img
                  src={
                    theme === 'light'
                      ? './img/logo/logo-main.svg'
                      : './img/logo/logo-dark-theme.svg'
                  }
                  alt="logo nice gadgets"
                />
              </Link>
            </div>

            <div className={`${styles.header_nav_pages_container}`}>
              <NavLink to="../" className={handleActiveLink}>
                <div className={`${styles.header_nav_title_wrapper}`}>
                  <h3 className={`${styles.header_nav_title} `}>home</h3>
                </div>
              </NavLink>
              <NavLink to="../phones" className={handleActiveLink}>
                <div className={`${styles.header_nav_title_wrapper}`}>
                  <h3 className={`${styles.header_nav_title}`}>phones</h3>
                </div>
              </NavLink>
              <NavLink to="../tablets" className={handleActiveLink}>
                <div className={`${styles.header_nav_title_wrapper}`}>
                  <h3 className={`${styles.header_nav_title}`}>tablets</h3>
                </div>
              </NavLink>
              <NavLink to="../accessories" className={handleActiveLink}>
                <div className={`${styles.header_nav_title_wrapper}`}>
                  <h3 className={`${styles.header_nav_title}`}>accessories</h3>
                </div>
              </NavLink>
            </div>

            <div className={`${styles.header_nav_buttons_container}`}>
              <div className={`${styles.switch_wrapper}`}>
                <label id="switch" className={`${styles.switch}`}>
                  <input
                    type="checkbox"
                    onChange={() => toggleTheme()}
                    id="slider"
                    checked={theme === 'light'}
                    aria-label="Toggle theme"
                  />
                  <span
                    className={classNames(`${styles.slider} ${styles.round}`)}
                  ></span>
                </label>
              </div>
              <NavLink to={'../favourites'} className={handleFavLink}>
                <img
                  src={
                    theme === 'light'
                      ? './img/icons/card-default-like.svg'
                      : './img/icons/like-dark-theme.svg'
                  }
                  alt="favourite items"
                  className={`${styles.header_nav_icon}`}
                />
                {favourites.length > 0 && (
                  <span className={`${styles.header_fav_count}`}>
                    {favourites.length > 9 ? '9+' : favourites.length}
                  </span>
                )}
              </NavLink>
              <NavLink to={'../cart'} className={handleCartLink}>
                <img
                  src={
                    theme === 'light'
                      ? './img/icons/shopping-bag.svg'
                      : './img/icons/shopping-bag-dark-theme.svg'
                  }
                  alt="shopping bag"
                  className={`${styles.header_nav_icon}`}
                />
                {cartProducts.length > 0 && (
                  <span
                    className={`${styles.header_fav_count} ${styles.active_cart}`}
                  >
                    {totalQuantity > 9 ? '9+' : totalQuantity}
                  </span>
                )}
              </NavLink>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;
