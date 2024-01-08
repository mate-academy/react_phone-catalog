import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useSearchedItems } from '../../hooks/useFavouriteItems';
import { ProductList } from '../../components/ProductList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { formatTotal } from '../../utils/formatTotal';

import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { favouriteItems } = useAppSelector(state => state.favouriteItems);

  const searchedItems = useSearchedItems(favouriteItems);

  const searchedItemsTotal = useMemo(() => {
    return searchedItems.length;
  }, [searchedItems]);

  const isSearchedItemsEmpty = useMemo(() => {
    return searchedItems.length === 0;
  }, [searchedItems]);

  const totalString = formatTotal(searchedItemsTotal, 'model');

  return (
    <section className="Page-Favourites Favourites">
      <Breadcrumbs />

      <h1 className="Favourites-Title SectionTitle">Favourites</h1>

      {isSearchedItemsEmpty
        ? 'Your favourites is empty'
        : (
          <>
            <div className="Favourites-Total Total">
              {totalString}
            </div>

            <ProductList products={searchedItems} />
          </>
        )}
    </section>
  );
};
