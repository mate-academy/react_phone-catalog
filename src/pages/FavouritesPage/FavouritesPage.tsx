import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {
  useFavouriteItems,
  useFavouriteItemsTotal,
} from '../../hooks/useFavouriteItems';
import { ProductList } from '../../components/ProductList';
import { Breadcrumbs } from '../../components/Breadcrumbs';

import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { favouriteItems } = useAppSelector(state => state.favouriteItems);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredItems = useFavouriteItems(favouriteItems, query);
  const favouriteItemsTotal = useFavouriteItemsTotal(filteredItems, query);

  const isFavouritesEmpty = useMemo(() => {
    return favouriteItemsTotal === 0;
  }, [favouriteItemsTotal]);

  return (
    <section className="Page-Section Favourites">
      <Breadcrumbs />

      <h1 className="Favourites-Title SectionTitle">Favourites</h1>

      {isFavouritesEmpty
        ? 'Your favourites is empty'
        : (
          <>
            <div className="Favourites-Quantity">
              {`${favouriteItemsTotal} items`}
            </div>

            <ProductList products={filteredItems} />
          </>
        )}
    </section>
  );
};
