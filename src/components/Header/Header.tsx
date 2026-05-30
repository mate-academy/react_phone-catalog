import React, { useState } from 'react';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { MenuMobile } from './MenuMobile';
import { navigationItems, navigationPaths } from './constants/category';
import { useCart } from '../../hooks/useCart';
import { useFavourites } from '../../hooks/useFavourites';
import classNames from 'classnames';
import { SearchInput } from './MenuMobile/SearchInput';
import { useAppContext } from '../../hooks/useAppContext';
import { getAssetUrl } from '../../api/utilis';
import {
  themeIconBasket,
  themeIconBurger,
  themeIconFavourite,
  themeIconLogo,
} from '../../utils/iconsTheme';

type HeaderProps = {
  showSearch: boolean;
};

export const Header = ({ showSearch }: HeaderProps) => {
  const { state, dispatch } = useAppContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { cart } = useCart();
  const { favourites } = useFavourites();

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navigationMenu__item, {
      [styles['navigationMenu__item--active']]: isActive,
    });

  const getNavLinkMenu = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.list__link, {
      [styles['list__link--active']]: isActive,
    });

  const allQuantityBasket = cart?.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const allQuantityFavourites = favourites.length;

  const handleChangeTheme = () => {
    dispatch({ type: 'TOOGLE_THEME' });
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <div className={styles.logo}>
            <Link to="/" aria-label="main page">
              <img
                className={styles.logo__img}
                src={themeIconLogo(state.theme)}
                alt="phone shop logo"
              />
              <img
                className={styles.logo__hand}
                src={getAssetUrl('icons/logo_ok_hand.svg')}
                alt=""
                aria-hidden="true"
              />
            </Link>
          </div>
          <ul className={styles.list}>
            {navigationItems.map(item => (
              <li key={item} className={styles.list__item}>
                <NavLink to={navigationPaths[item]} className={getNavLinkMenu}>
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <nav className={styles.navigation}>
          <button
            className={styles.navigation__button}
            type="button"
            aria-label="open menu"
            onClick={() => setIsOpen(true)}
          >
            <img
              className={styles.navigation__img}
              src={themeIconBurger(state.theme)}
              alt=""
              aria-hidden="true"
            />
          </button>
        </nav>

        <nav className={styles.navigationMenu}>
          {showSearch && <SearchInput />}
          <NavLink
            className={getNavLinkClass}
            to="/favourites"
            aria-label="your favourite products"
          >
            <div className={styles.navigationMenu__wrapper}>
              <img
                className={styles.navigationMenu__img}
                src={themeIconFavourite(state.theme)}
                alt=""
                aria-hidden="true"
              />
              {favourites.length > 0 && (
                <div className={styles.quantity}>
                  <p className={styles.quantity__value}>
                    {allQuantityFavourites}
                  </p>
                </div>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={getNavLinkClass}
            aria-label="go to basket page"
          >
            <div className={styles.navigationMenu__wrapper}>
              <img
                className={styles.navigationMenu__img}
                src={themeIconBasket(state.theme)}
                alt=""
                aria-hidden="true"
              />
              {cart.length > 0 && (
                <div className={styles.quantity}>
                  <p className={styles.quantity__value}>{allQuantityBasket}</p>
                </div>
              )}
            </div>
          </NavLink>
          <div className={styles.navigationMenu__theme}>
            <button
              className={styles.navigationMenu__button}
              aria-label="change theme"
              onClick={handleChangeTheme}
            >
              <img
                className={classNames(
                  styles.navigationMenu__img,
                  styles['navigationMenu__img--theme'],
                )}
                src={getAssetUrl('icons/theme.svg')}
                alt=""
                aria-hidden="true"
              />
            </button>
          </div>
        </nav>
      </header>
      {isOpen && (
        <MenuMobile
          setIsOpen={setIsOpen}
          basket={allQuantityBasket}
          favourites={allQuantityFavourites}
        />
      )}
    </>
  );
};
