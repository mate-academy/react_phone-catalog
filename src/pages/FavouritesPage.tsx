import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPhonesList } from '../api';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { ProductCard } from '../components/ProductCard';
import { Error } from '../components/Error';
import { ProductsContext } from '../context/ProductsContext';
import { Phone } from '../types/Phone';
import { SearchKey } from '../types/SearchKey';
import { filterFavourites, filteredList } from '../utils/orderedList';

export const FavouritesPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { favouritesList } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();
  const querry = searchParams.get(SearchKey.Querry);

  const fetchProcess = (api: Phone[]) => {
    setIsFetching(false);
    setIsError(false);

    setPhones(api);
  };

  const errorProcess = () => {
    setIsFetching(false);
    setIsError(true);
  };

  useEffect(() => {
    setIsFetching(true);

    getPhonesList()
      .then(resolve => fetchProcess(resolve))
      .catch(errorProcess);
  }, []);

  const favouritesPhones = useMemo(() => {
    return querry
      ? filteredList(filterFavourites(phones, favouritesList), querry)
      : filterFavourites(phones, favouritesList);
  }, [favouritesList, phones, querry]);

  return isFetching
    ? <Loader />
    : (
      <main className="favourites-page">
        <Error isError={isError} />
        <Breadcrumbs />
        <h1 className="favourites-page__title">
          Favourites
        </h1>
        <div className="favourites-page__quantity">
          {`${favouritesPhones.length} items`}
        </div>
        <ul className="favourites-page__list">
          {favouritesPhones.map(phone => (
            <li key={phone.id}>
              <ProductCard phone={phone} />
            </li>
          ))}
        </ul>
      </main>
    );
};
