import React from 'react';
import styles from './Header.module.scss';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Nav } from '../Nav/Nav';
import {
  FavouriteIcon,
  Logo,
  CartIcon,
  SearchIcon,
  Burger,
  Close,
} from '../../helpers/icons';
import { AppContext } from '../../AppContext';
import { MobileNav } from '../MobileNav';
import classNames from 'classnames';

export const Header = () => {
  const {
    isMobileMenu,
    setIsMobileMenu,
    favouriteProducts,
    cart,
    isSearch,
    search,
    setSearch,
  } = React.useContext(AppContext);
  const [favouriteCounter, setFavouriteCounter] = React.useState(
    favouriteProducts.length,
  );
  const [cartCounter, setCartCounter] = React.useState(
    cart.reduce((acc, item) => acc + item.quantity, 0),
  );
  const [searchParams, setSearchParams] = useSearchParams();
  // const [isMobileMenu, setIsMobileMenu] = React.useState(false);

  React.useEffect(
    () => setFavouriteCounter(favouriteProducts.length),
    [favouriteProducts],
  );

  React.useEffect(
    () => setCartCounter(cart.reduce((acc, item) => acc + item.quantity, 0)),
    [cart],
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
    setSearch(value);
  };

  return (
    <header className={styles.container}>
      <div className={styles.leftSide}>
        <NavLink
          to="/"
          className={styles.logo}
          onClick={() => setIsMobileMenu(false)}
        >
          <Logo />
        </NavLink>

        <Nav />

        <button
          type="button"
          className={styles.burger}
          onClick={() => setIsMobileMenu(!isMobileMenu)}
        >
          {isMobileMenu ? <Close /> : <Burger />}
        </button>

        {isMobileMenu && <MobileNav />}
      </div>

      <div className={styles.rightSide}>
        {isSearch && (
          <div className={styles.searchWrapper}>
            <span>
              <SearchIcon />
            </span>
            <input
              type="search"
              className={styles.search}
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        )}

        <NavLink
          to="/favourites"
          className={({ isActive }: { isActive: boolean }) =>
            classNames(styles.favourite, isActive ? styles.active : '')
          }
        >
          <FavouriteIcon />
          {!!favouriteCounter && (
            <span className={styles.counter}>{favouriteCounter}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }: { isActive: boolean }) =>
            classNames(styles.cart, isActive ? styles.active : '')
          }
        >
          <CartIcon />
          {!!cartCounter && (
            <span className={styles.counter}>{cartCounter}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};
