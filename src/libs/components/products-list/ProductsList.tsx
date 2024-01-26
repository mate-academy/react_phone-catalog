import './styles.scss';

import { ProductType } from '../../types';
import { Product } from '../product/Product';

type Props = {
  products: ProductType[],
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <section
      className="products-list"
      data-cy="productList"
    >
      {products.map(product => (
        <Product
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
};
