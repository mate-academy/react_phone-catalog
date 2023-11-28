// import { useSearchParams } from 'react-router-dom';
import './favoritesPage.scss';
// import { useContext, useEffect, useState } from 'react';
// import { FavoritesContext } from '../../components/ContextProviders';
// import { getqueryFavorites } from '../../utils/pageMethods';
import { Phones } from '../../types/Phones';
import { ProductList } from '../../components/ProductList';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const FavoritesPage = () => {
  // const { favorites } = useContext(FavoritesContext);
  // const [searchParams] = useSearchParams();
  // const query = searchParams.get('query') || '';
  // const [currentFavorites, setCurrentFavorites] = useState<Phones[]>([]);
  const [currentFavorites]
  = useLocalStorage<Phones[]>('favorites', []);

  // useEffect(() => {
  //   if (query) {
  //     const updatedFavorites = getqueryFavorites(favorites, query);

  //     setCurrentFavorites(updatedFavorites);
  //   } else {
  //     setCurrentFavorites(favorites);
  //   }
  // }, [query]);

  return (
    <>
      <h1 className="favoritesPage__title">Favourites</h1>
      <p className="favoritesPage__description">{`${currentFavorites.length} items`}</p>
      <ProductList dataPhones={currentFavorites} />
    </>

  );
};
