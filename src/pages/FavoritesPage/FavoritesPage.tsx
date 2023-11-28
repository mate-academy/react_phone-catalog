import {
  FC, useContext, useState, useEffect,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { FavoriteStorageContext } from '../../context/FavoriteStorageContext';
import { FavoriteItem } from '../../types/FavoriteItem';
import { getCurrentFavorites } from '../../helpers/pagesMethods';
import { PagePath } from '../../components/PagePath/PagePath';
import { NoResults } from '../../components/NoResult/NoResult';
import { Loader } from '../../components/Loader';
import { NoSearchResult } from '../../components/NoSearchResult/NoSearchResult';
import { ProductsList } from '../../components/ProductsList/ProductsList';

export const FavoritesPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { favorites } = useContext(FavoriteStorageContext);
  const [currentFavorites, setCurrentFavorites] = useState<FavoriteItem[]>([]);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setIsLoading(true);

    if (query) {
      const updatedFavorites = getCurrentFavorites(query, favorites);

      setCurrentFavorites(updatedFavorites);
    } else {
      setCurrentFavorites(favorites);
    }

    setIsLoading(false);
  }, [favorites, location]);

  return (
    <div className="
      main__products-page
      main__products-page-width
      products-page
      favorites"
    >
      <PagePath title="Favorites" url="/favorites" />

      <h1 className="products-page__title page-title">
        Favorites
      </h1>

      {isLoading && <Loader />}

      {!isLoading && !favorites.length && (
        <NoResults
          title="No one favorites product"
          imageUrl="img/noFavorites.jpg"
        />
      )}

      {!!favorites.length && ((!isLoading && !currentFavorites.length) ? (
        <NoSearchResult />
      ) : (!isLoading && (
        <>
          <p className="products-page__total-amount">
            {`${currentFavorites.length} ${currentFavorites.length === 1 ? 'item' : 'items'}`}
          </p>
          <ProductsList
            products={currentFavorites}
            isSlider={false}
          />
        </>
      )))}
    </div>
  );
};
