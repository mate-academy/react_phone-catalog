import { useSearchParams } from 'react-router-dom';
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FavoriteContext } from '../../../contexts/FavoriteContextProvider';
import { ProductCard } from '../../../components/Product/Card';
import { Product } from '../../../types/Product';
import { productFilter } from '../../../helpers/productFilter';

import './FavoritesItemList.scss';

export const FavoritesItemList = () => {
  const { favorites } = useContext(FavoriteContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const filterProducts = useMemo(() => (
    productFilter(favorites, query)
  ), [debouncedQuery, favorites]);

  return (
    <>
      <ul className="favorites-list">
        {filterProducts.map((currentProduct: Product) => {
          return (
            <li
              className="favorites-list--item"
              key={currentProduct.itemId}
            >
              <ProductCard product={currentProduct} />
            </li>
          );
        })}
      </ul>

      {!filterProducts.length && (
        <h1>
          No search results
        </h1>
      )}
    </>
  );
};
