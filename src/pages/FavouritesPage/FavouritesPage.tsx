import { useMemo } from 'react';
import { ProductList } from '../../components/ProductList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useAppSelector } from '../../app/hooks';

import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { favouriteItems } = useAppSelector(state => state.favouriteItems);

  const isFavouritesEmpty = useMemo(() => {
    return favouriteItems.length === 0;
  }, [favouriteItems]);

  const favouriteQuantity = favouriteItems.length;

  return (
    <section className="Page-Section Favourites">
      <Breadcrumbs />

      <h1 className="Favourites-Title SectionTitle">Favourites</h1>

      {isFavouritesEmpty && 'Your favourites is empty'}

      {!isFavouritesEmpty && (
        <>
          <div className="Favourites-Quantity">
            {`${favouriteQuantity} items`}
          </div>

          <ProductList products={favouriteItems} />
        </>
      )}
    </section>
  );
};
