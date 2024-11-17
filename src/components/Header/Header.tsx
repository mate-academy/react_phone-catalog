import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';

import styles from './Header.module.scss';
import logo from '../../assets/icons/logo.png';
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Navigation } from '../Navigation';
import { CartContext, FavouriteContext } from '../../ContextProvider';
import { BtnType } from '../../types/BtnType';
import { getTotalProductsInCart } from '../../utils/getTotalProductsInCart';
import { ProductType } from '../../types/ProductType';

interface Props {
  isMobileMenuOpen: boolean;
  handleMobileMenu: (open: boolean) => void;
}

const activeLink = (isActive: boolean, btnType: BtnType) => {
  return classNames(styles.button, {
    buttonFavourite: btnType === BtnType.favorites,
    buttonCart: btnType === BtnType.cart,
    [styles.buttonActive]: isActive,
  });
};

export const Header: React.FC<Props> = ({
  isMobileMenuOpen,
  handleMobileMenu,
}) => {
  const [isSearchBtnVisible, setIsSearchBtnVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInput.current && isSearchOpen) {
      searchInput.current.focus();
    }
  }, [isSearchOpen]);

  const handleMenu = () => {
    handleMobileMenu(!isMobileMenuOpen);
  };

  const { cartProducts } = useContext(CartContext);
  const { favouriteProducts } = useContext(FavouriteContext);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = Object.keys(ProductType).find(
    productType => productType === pathname.slice(1),
  );

  useLayoutEffect(() => {
    if (category) {
      setIsSearchBtnVisible(true);
      setQuery('');
    }

    return () => setIsSearchBtnVisible(false);
  }, [category]);

  const openSearch = () => {
    setIsSearchOpen(true);
    handleMobileMenu(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSearchInput: React.ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value);

    const trimmedQuery = e.target.value.trim().toLowerCase();

    if (trimmedQuery) {
      searchParams.set(
        'query',
        trimmedQuery
          .split(' ')
          .map(str => str.trim())
          .filter(str => str)
          .join(' '),
      );
      searchParams.set('page', '1');
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  const totalNumOfProducts = getTotalProductsInCart(cartProducts);

  return (
    <header className={styles.topBarContainer} id="header">
      <div className={styles.topBar} id="header">
        <Link
          to="/"
          className={styles.topBarLogo}
          onClick={() => handleMobileMenu(false)}
        >
          <img src={logo} alt="Nice gadgets logo" />
        </Link>

        <div className={styles.navContainer}>
          <Navigation />
        </div>

        {isSearchBtnVisible && (
          <>
            <button
              className={classNames('buttonSearch', styles.btnSearch)}
              aria-label="Search products"
              onClick={openSearch}
            ></button>

            <div
              className={classNames(styles.searchInputContainer, {
                [styles.searchInputContainerIsActive]: isSearchOpen,
              })}
            >
              <input
                ref={searchInput}
                type="text"
                className={classNames(styles.searchInput, {
                  [styles.searchInputCaretActive]: !!query,
                })}
                placeholder={`Search in ${category}...`}
                aria-label={`Search in ${category}...`}
                inputMode="text"
                value={query}
                onBlur={() => setIsSearchOpen(false)}
                onChange={handleSearchInput}
              />
              <button
                className={classNames('buttonClose', styles.btnCloseSearch)}
                aria-label="Reset search"
                onClick={closeSearch}
              ></button>
            </div>
          </>
        )}
        <button
          className={classNames('buttonMenu', styles.buttonMenu, {
            buttonClose: isMobileMenuOpen,
          })}
          aria-label="Mobile menu"
          onClick={handleMenu}
        ></button>

        <div className={styles.buttonsContainer}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              activeLink(isActive, BtnType.favorites)
            }
            aria-label="Go to favourite products"
          >
            {!!favouriteProducts.length && (
              <span className="buttonFavouriteWrapper">
                {favouriteProducts.length}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            state={{ search: searchParams.toString(), pathname }}
            className={({ isActive }) => activeLink(isActive, BtnType.cart)}
            aria-label="Go to cart"
          >
            {!!totalNumOfProducts && (
              <span className="buttonCartWrapper">{totalNumOfProducts}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
