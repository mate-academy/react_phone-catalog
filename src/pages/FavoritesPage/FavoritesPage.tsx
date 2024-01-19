import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFavourites } from '../../context/FavouritesProvider';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';

import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const { favourites } = useFavourites();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const getVisibleFavourites = useCallback(() => {
    let currentProduct: Product[] = [...favourites];

    if (query) {
      currentProduct = currentProduct.filter((fav) => {
        return fav.name.toLowerCase().includes(query.toLowerCase());
      });
    }

    return currentProduct;
  }, [favourites, query]);

  const visibleFavourites = getVisibleFavourites();

  return (
    <div className="container">
      <div className="FavouritesPage">
        <BreadCrumbs />
        <h1 className="FavouritesPage__title name__page">Favourites</h1>
        <p className="count__page">
          {visibleFavourites
            ? `${visibleFavourites.length} ${visibleFavourites.length <= 1 ? 'model' : 'models'}` : '0 models'}
        </p>
        {visibleFavourites.length >= 1
          ? (
            <ProductList products={visibleFavourites} />
          )
          : (
            <p className="no-goods">
              No items have been added to favorites.
              Explore our selection and add items to your favorites
              list for convenient tracking and future purchases.
            </p>
          )}
      </div>
    </div>
  );
};
