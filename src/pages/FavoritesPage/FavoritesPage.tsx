// import { useSearchParams } from 'react-router-dom';
import './favoritesPage.scss';
// import { useContext, useEffect, useState } from 'react';
// import { FavoritesContext } from '../../components/ContextProviders';
// import { getqueryFavorites } from '../../utils/pageMethods';
import { useContext } from 'react';
import { ProductList } from '../../components/ProductList';
import { FavoritesContext } from
  '../../components/ContextProviders/ContextProviders';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const FavoritesPage = () => {
  // const { favorites } = useContext(FavoritesContext);
  // const [searchParams] = useSearchParams();
  // const query = searchParams.get('query') || '';
  // const [currentFavorites, setCurrentFavorites] = useState<Phones[]>([]);
  // const [currentFavorites]
  // = useLocalStorage<Phones[]>('favorites', []);
  const { favorites } = useContext(FavoritesContext);

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
      <Breadcrumbs />
      <h1 className="favoritesPage__title">Favourites</h1>
      <p className="favoritesPage__description">{`${favorites.length} items`}</p>
      <ProductList dataProducts={favorites} />
    </>
  );
};
