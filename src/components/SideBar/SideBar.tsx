import React from 'react';
import styles from './SideBar.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../ThemeContext/ThemeContext';
import { useFavourites } from '../Favourites/FavouritesContext';
import { useCartProducts } from '../Cart/CartContext';

type Props = {
  setActiveAside: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideBar: React.FC<Props> = ({ setActiveAside }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { favourites } = useFavourites();
  const { cartProducts } = useCartProducts();

  const handlerActiveLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(`${styles.menu_link}`, {
      [styles.active_link]: isActive,
    });
  };

  const handleActiveFooterButton = ({ isActive }: { isActive: boolean }) => {
    return classNames(`${styles.footer_button}`, {
      [styles.active_footer_button]: isActive,
    });
  };

  return (
    <>
      <aside className={`${styles.side_bar_container}`}>
        <nav className={`${styles.header_nav_container}`}>
          <div className={`${styles.header_nav_logo_container}`}>
            <a href="/">
              <img
                src={
                  isLight
                    ? './img/logo/logo-main.svg'
                    : './img/logo/logo-dark-theme.svg'
                }
                alt="logo nice gadgets"
              />
            </a>
          </div>

          <div
            className={`${styles.header_nav_close_container}`}
            onClick={() => setActiveAside(false)}
          >
            <button className={`${styles.header_nav_close_button}`}>
              <img
                src={
                  isLight
                    ? './img/icons/close-icon.svg'
                    : './img/icons/close-icon-dark-theme.svg'
                }
                alt="close burron"
              />
            </button>
          </div>
        </nav>

        <div className={`${styles.menu_container}`}>
          <NavLink
            to="/"
            className={handlerActiveLinkClass}
            onClick={() => setActiveAside(false)}
          >
            <p className={`${styles.menu_title}`}>home</p>
          </NavLink>
          <NavLink
            to="/phones"
            className={handlerActiveLinkClass}
            onClick={() => setActiveAside(false)}
          >
            <p className={`${styles.menu_title}`}>phones</p>
          </NavLink>
          <NavLink
            to="/tablets"
            className={handlerActiveLinkClass}
            onClick={() => setActiveAside(false)}
          >
            <p className={`${styles.menu_title}`}>tablets</p>
          </NavLink>
          <NavLink
            to="/accessories"
            className={handlerActiveLinkClass}
            onClick={() => setActiveAside(false)}
          >
            <p className={`${styles.menu_title}`}>accessories</p>
          </NavLink>
        </div>

        <div className={`${styles.footer_container}`}>
          <NavLink
            to="/favourites"
            className={handleActiveFooterButton}
            onClick={() => setActiveAside(false)}
          >
            <img
              src={
                isLight
                  ? './img/icons/card-default-like.svg'
                  : './img/icons/like-dark-theme.svg'
              }
              alt="like icon"
              className={`${styles.footer_img_icon}`}
            />
            {favourites.length > 0 && (
              <span className={`${styles.side_bar_fav_count}`}>
                {favourites.length > 9 ? '9+' : favourites.length}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            className={handleActiveFooterButton}
            onClick={() => setActiveAside(false)}
          >
            <div className={`${styles.footer_icon_wrapper}`}>
              <img
                src={
                  isLight
                    ? './img/icons/shopping-bag.svg'
                    : './img/icons/shopping-bag-dark-theme.svg'
                }
                alt="shopping bag icon"
                className={`${styles.footer_img_icon}`}
              />
              {cartProducts.length > 0 && (
                <span
                  className={`${styles.side_bar_fav_count} ${styles.active_cart}`}
                >
                  {cartProducts.length > 9 ? '9+' : cartProducts.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
