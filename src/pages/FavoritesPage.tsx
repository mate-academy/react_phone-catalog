import { FC } from 'react';
import Breadcrumbs from './components/Breadcrumbs';
import { ProductsList } from './components/ProductsList';
import { useAppSelector } from '../app/hooks';

export const FavoritesPage: FC = () => {
  const favoritesPhones = useAppSelector(state => state.phonesFavorites.value);
  const searchBarValue = useAppSelector(state => state.searchBar.value);

  const phonesSearched = favoritesPhones.filter((product) => {
    if (searchBarValue.trim() === '') {
      return true;
    }

    const queryWords = searchBarValue.toLowerCase().split(' ');
    const productName = product.name.toLowerCase();

    return queryWords.every((word) => productName.includes(word));
  });

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
