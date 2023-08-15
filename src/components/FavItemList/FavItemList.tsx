import './FavItemList.scss';
import { useSearchParams } from 'react-router-dom';
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { FavContext } from '../contexts/FavContextProvider';
import { filterProducts } from '../../helpers/filterProducts';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';

export const FavItemList = () => {
  const { favourites } = useContext(FavContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const filteredProducts = useMemo(() => (
    filterProducts(favourites, query)
  ), [debouncedQuery, favourites]);

  return (
    <>
      <ul className="fav-list">
        {filteredProducts.map(product => {
          return (
            <li
              className="fav-list__item"
              key={product.itemId}
            >
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>

      {!filteredProducts.length && <NoSearchResults />}
    </>
  );
};
