import { FC, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { NavLinks } from '../nav-links/NavLinks';
import { NavIcon } from '../nav-icon/NavIcon';
import { SearchBar } from '../search-bar/SearchBar';
import { SearchResult } from '../search-result/SearchResult';
import { BagIcon } from '@ui/icon/BagIcon';
import { HeartIcon } from '@ui/icon/HeartIcon';
import { Logo } from '@ui/logo/Logo';

import { useCart } from '@hooks/useCart';
import { useProducts } from '@hooks/useProducts';
import { useFavourites } from '@hooks/useFavourites';
import { useOutsideClick } from '@hooks/useOutsideClick ';
import { scrollToTop } from '@utils/helpers/scrollToTop';
import { ROUTES } from '@utils/constants/routes';
import { DATA_MENU } from '../navbar/navbar.data';

import styles from './NavDesktop.module.scss';

export const NavDesktop: FC = () => {
  const location = useLocation();
  const { itemId, pathname } =
    (location.state as { itemId: string; pathname: string }) || {};
  const { products, filteredByQuery } = useProducts();
  const { hasCartProduct } = useCart();
  const { hasFavouritesProduct } = useFavourites();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const resetSearchBar = () => {
    setQuery('');
    setFilteredProducts([]);
  };

  const searchBarRef = useOutsideClick(resetSearchBar);

  useEffect(() => {
    setIsOpen(pathname === ROUTES.FAVOURITES);
    resetSearchBar();
  }, [pathname]);

  const onChangeFilterProducts = useCallback(
    (query: string) => {
      if (!query) {
        resetSearchBar();
        return;
      }

      setQuery(query);

      const trimmedQuery = query.trim();
      const filtered = filteredByQuery(trimmedQuery);

      setFilteredProducts(filtered);
    },
    [products, setFilteredProducts],
  );

  return (
    <nav className={styles.navDesktop}>
      <div className={styles.items}>
        <Logo onClickAction={scrollToTop} />

        <ul className={styles.links}>
          {DATA_MENU.map(item => (
            <NavLinks key={item.name} item={item} />
          ))}
        </ul>

        <div className={styles.searchBar} ref={searchBarRef}>
          <SearchBar
            onSearch={onChangeFilterProducts}
            query={query}
            setFilteredProducts={() => setFilteredProducts([])}
          />

          {query && (
            <SearchResult
              filteredProducts={filteredProducts}
              setQuery={() => setQuery('')}
              currentItemId={itemId}
            />
          )}
        </div>
      </div>

      <div className={styles.wrapper}>
        <NavIcon
          text="Favorite"
          products={hasFavouritesProduct}
          ROUTE={ROUTES.FAVOURITES}
        >
          <HeartIcon isOpen={isOpen} />
        </NavIcon>

        <NavIcon text="Cart" products={hasCartProduct} ROUTE={ROUTES.CART}>
          <BagIcon />
        </NavIcon>
      </div>
    </nav>
  );
};
