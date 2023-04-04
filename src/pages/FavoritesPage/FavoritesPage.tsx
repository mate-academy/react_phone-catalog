import {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { NoResults } from '../../components/NoResults';
import { PagePath } from '../../components/PagePath';
import { ProductsList } from '../../components/ProductsList';
import { FavoritesStorageContext } from '../../Context/FavoritesStorageContext';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { getCurrentFavorites } from '../../helpers/pagesMethods';
import { NoSearchResults } from '../../components/NoSearchResults';
import { Loader } from '../../components/Loader';

export const FavoritesPage: FC = () => {
  const { favourites } = useContext(FavoritesStorageContext);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [currentFavorites, setCurrentFavorites]
    = useState<FavoriteProduct[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (query) {
        const updatedFavorites = getCurrentFavorites(favourites, query);

        setCurrentFavorites(updatedFavorites);
      } else {
        setCurrentFavorites(favourites);
      }

      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [location, favourites]);

  return (
    <div
      className="
      main__products-page
      main__products-page--width
      products-page
      favorites
      "
    >
      <PagePath url="/favorites" title="Favourites" />

      <h1 className="products-page__title page-title">Favourites</h1>

      {!isLoading && !favourites.length && (
        <NoResults
          title="Click the heart icon on any product to add a favorite &#x2764;"
          imageUrl="./img/img/no_favorites.jpg"
        />
      )}

      {isLoading && <Loader />}

      {!!favourites.length && ((!isLoading && !currentFavorites.length) ? (
        <NoSearchResults />
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
