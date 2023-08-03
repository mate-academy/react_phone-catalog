import { FC } from 'react';
import '../../styles/styles.scss';
import { useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCard } from './ProductCard';
import { useAppSelector } from '../../app/hooks';

type Props = {
  products: Product[],
};

export const ProductsList: FC<Props> = ({ products }) => {
  const location = useLocation();
  const favolritesLenght = useAppSelector(
    state => state.phonesFavorites.value,
  ).length;
  const messageForZeroProducts = products.length > 0
    ? null
    : `All  ${location.pathname.split('/')[1]} have been sold, try to come back latter, please.`;

  const messageForZeroFavorites = favolritesLenght < 1
    ? 'Add something to favorites card...'
    : null;

  return (
    <>
      {messageForZeroProducts && location.pathname !== '/favorites' ? (
        <h1 className="info-messages">
          { messageForZeroProducts }
        </h1>
      ) : (
        <ul className="products-list">
          {products.map(product => (
            <li className="products-list__item" key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

      {location.pathname === '/favorites' && (
        <h1 className="info-messages">{messageForZeroFavorites}</h1>
      )}
    </>
  );
};
