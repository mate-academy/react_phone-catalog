import { FC } from 'react';
import Breadcrumbs from './components/Breadcrumbs';
import { ProductsList } from './components/ProductsList';
import { useAppSelector } from '../app/hooks';
import { filteringVisibleSearchedProducts } from '../app/utils';
import { favoriteProductsSelector, searchBarSelector } from '../app/selector';

export const FavoritesPage: FC = () => {
  const favoritesPhones = useAppSelector(favoriteProductsSelector);
  const searchBarValue = useAppSelector(searchBarSelector);

  const phonesSearched = filteringVisibleSearchedProducts(
    favoritesPhones, searchBarValue,
  );

  return (
    <div className="favorites-page">
      <Breadcrumbs />
      <h1 className="favorites-page__title">Favourites</h1>
      <p className="favorites-page__items-amount">
        {`${favoritesPhones.length} items`}
      </p>
      <ProductsList products={phonesSearched} />
    </div>
  );
};
