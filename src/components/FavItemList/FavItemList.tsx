import './favItemList.scss';
import { useMemo, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FavContext } from '../contexts/FavContextProvider';
import { ProductCard } from '../ProductCard/ProductCard';
import { filterProducts } from '../../helpers/filterProducts';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';

export const FavItemList = () => {
  const [searchParams] = useSearchParams();
  const { favourites } = useContext(FavContext);

  const query = searchParams.get('query') || '';

  const filteredProducts = useMemo(() => (
    filterProducts(favourites, query)
  ), [query]);

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
