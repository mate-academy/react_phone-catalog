import React from 'react';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useFavourites } from '../Favourites/FavouritesContext';
import { useCartProducts } from '../Cart/CartContext';

type Props = {
  setActiveAside: (arg: boolean) => void;
  width: number;
};

export const Header: React.FC<Props> = ({ setActiveAside, width }) => {
  const { favourites } = useFavourites();
  const { cartProducts } = useCartProducts();

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
              <Link to="/">
                <img src="./img/logo/logo-main.svg" alt="logo nice gadgets" />
              </Link>
            </div>

            <div
              className={`${styles.header_nav_burger_container}`}
              onClick={() => {
                setActiveAside(true);
              }}
            >
              <button className={`${styles.header_nav_burger_button}`}>
                <img src="./img/icons/burger-menu-icon.svg" alt="burger menu" />
              </button>
            </div>
          </nav>
        </>
      )}
      {width >= 640 && (
        <>
          <nav className={`${styles.header_nav_container}`}>
            <div className={`${styles.header_nav_logo_container}`}>
              <Link to="/">
                <img src="./img/logo/logo-main.svg" alt="logo nice gadgets" />
              </Link>
            </div>

            <div className={`${styles.header_nav_pages_container}`}>
              <NavLink to="/" className={handleActiveLink}>
                <div className={`${styles.header_nav_title_wrapper}`}>
                  <h3 className={`${styles.header_nav_title} `}>home</h3>
                </div>
              </NavLink>
              <NavLink to="/phones" className={handleActiveLink}>
                <div className={`${styles.header_nav_title_wrapper}`}>
                  <h3 className={`${styles.header_nav_title}`}>phones</h3>
                </div>
              </NavLink>
              <NavLink to="/tablets" className={handleActiveLink}>
                <div className={`${styles.header_nav_title_wrapper}`}>
                  <h3 className={`${styles.header_nav_title}`}>tablets</h3>
                </div>
              </NavLink>
              <NavLink to="/accessories" className={handleActiveLink}>
                <div className={`${styles.header_nav_title_wrapper}`}>
                  <h3 className={`${styles.header_nav_title}`}>accessories</h3>
                </div>
              </NavLink>
            </div>

            <div className={`${styles.header_nav_buttons_container}`}>
              <NavLink to={'/favourites'} className={handleFavLink}>
                <img
                  src="./img/icons/card-default-like.svg"
                  alt="favourite items"
                  className={`${styles.header_nav_icon}`}
                />
                {favourites.length > 0 && (
                  <span className={`${styles.header_fav_count}`}>
                    {favourites.length > 9 ? '9+' : favourites.length}
                  </span>
                )}
              </NavLink>
              <NavLink to={'/cart'} className={handleCartLink}>
                <img
                  src="./img/icons/shopping-bag.svg"
                  alt="shopping bag"
                  className={`${styles.header_nav_icon}`}
                />
                {cartProducts.length > 0 && (
                  <span
                    className={`${styles.header_fav_count} ${styles.active_cart}`}
                  >
                    {cartProducts.length > 9 ? '9+' : cartProducts.length}
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
