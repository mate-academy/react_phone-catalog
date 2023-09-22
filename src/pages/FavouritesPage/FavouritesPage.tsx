/* eslint-disable no-restricted-syntax */
import '../../styles/pages/FavouritesPage/FavouritesPage.scss';

import { useMemo } from 'react';
import { Crumbs } from '../../components/Crumbs';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/product';
import { Item } from '../../types/storageItem';
import { productService } from '../../utils/productService';

type Props = {
  query: string,
  isIncluded: (items: Item<Product>[], value: Product) => boolean;
  cart: Item<Product>[];
  fav: Item<Product>[];
  onSelectedClick: (value: Product) => void;
  onFavClick: (value: Product) => void;
};

export const FavouritesPage: React.FC<Props> = ({
  query,
  isIncluded,
  fav,
  cart,
  onFavClick,
  onSelectedClick,
}) => {
  const visibleProducts = useMemo(() => {
    return productService
      .filterItems(fav, query)
      .map(item => item.value);
  }, [query, fav]);

  return (
    <main className="fav-page">
      <Crumbs />

      <h1 className="fav-page__title">Favourites</h1>

      <p className="fav-page__quantity">{`${fav.length} items`}</p>

      {fav.length < 1 && (
        <h1 className="products-page__sad-message">Any favourites yet</h1>
      )}

      {fav.length > 0 && visibleProducts.length < 1 && (
        <h1 className="products-page__sad-message">
          Any favourites by given criteria
        </h1>
      )}

      {visibleProducts.length > 0 && (
        <div className="fav-page__product-list">
          <ProductList
            products={visibleProducts}
            cart={cart}
            fav={fav}
            onFavClick={onFavClick}
            onSelectedClick={onSelectedClick}
            isIncluded={isIncluded}
          />
        </div>
      )}
    </main>
  );
};
