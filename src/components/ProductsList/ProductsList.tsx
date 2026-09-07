import { Product } from '../../types/product';
import { ProductItem } from '../ProductItem';
import { ProductItemLoader } from '../ProductItem/ProductItemLoader';

import './ProductsList.scss';

type Props = {
  products: Product[];
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
};

export const ProductsList: React.FC<Props> = ({ products, status }) => {
  return (
    <div className="products-list">
      {status === 'loading' &&
        Array.from({ length: 12 }).map((_, index) => (
          <ProductItemLoader key={index} />
        ))}

      {(!status || status === 'succeeded') &&
        products.map(item => {
          return (
            <ProductItem key={item.id} itemData={item} showFullPrice={true} />
          );
        })}
    </div>
  );
};
