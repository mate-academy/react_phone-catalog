import { FC } from 'react';
import '../../styles/styles.scss';
import { useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCard } from './ProductCard';
import { useAppSelector } from '../../app/hooks';
import {
  favoriteProductsSelector,
  searchBarSelector,
} from '../../app/selector';

type Props = {
  products: Product[],
};

export const ProductsList: FC<Props> = ({ products }) => {
  const location = useLocation();
  const favolritesLenght = useAppSelector(favoriteProductsSelector).length;
  const messageForZeroProducts = products.length > 0
    ? null
    : `All  ${location.pathname.split('/')[1]} have been sold, try to come back latter, please.`;

  const messageForZeroFavorites = favolritesLenght < 1
    ? 'Add something to favorites card...'
    : null;
  const searchBarValue = useAppSelector(searchBarSelector);
  const noSearchedResultMessage = 'No matches found';

  return (
    <>
      {!searchBarValue
       && messageForZeroProducts
       && location.pathname !== '/favorites'
        ? (
          <h1 className="info-messages">{ messageForZeroProducts }</h1>
        ) : (
          <ul className="products-list">
            {products.map(product => (
              <li className="products-list__item" key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      {searchBarValue && messageForZeroProducts && (
        <h1 className="info-messages">{noSearchedResultMessage}</h1>
      )}
      {location.pathname === '/favorites' && !searchBarValue && (
        <h1 className="info-messages">{messageForZeroFavorites}</h1>
      )}
    </>
  );
};
