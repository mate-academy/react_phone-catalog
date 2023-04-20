import {
  useContext,
  useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { ProductCard } from '../components/ProductCard';
import { Error } from '../components/Error';
import { ProductsContext } from '../context/ProductsContext';
import { SearchKey } from '../types/SearchKey';
import { filterFavourites, filteredList } from '../utils/orderedList';
import { useFetch } from '../hooks/useFetch';

export const FavouritesPage: React.FC = () => {
  const { favouritesList } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();
  const querry = searchParams.get(SearchKey.Querry);
  const { phones, isErrorPhones, isPhonesLoading } = useFetch();

  const favouritesPhones = useMemo(() => {
    return querry
      ? filteredList(filterFavourites(phones, favouritesList), querry)
      : filterFavourites(phones, favouritesList);
  }, [favouritesList, phones, querry]);

  return isPhonesLoading
    ? <Loader />
    : (
      <main className="favourites-page">
        <Error isError={isErrorPhones} />
        <Breadcrumbs />
        <h1 className="favourites-page__title">
          Favourites
        </h1>
        <div className="favourites-page__quantity">
          {`${favouritesPhones.length} items`}
        </div>
        {querry && !favouritesPhones.length
          ? (
            <h2>No corresponding gadgets</h2>
          ) : (
            <ul className="favourites-page__list">
              {favouritesPhones.map(phone => (
                <li key={phone.id}>
                  <ProductCard phone={phone} />
                </li>
              ))}
            </ul>
          )}
      </main>
    );
};
