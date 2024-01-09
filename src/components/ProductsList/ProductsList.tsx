/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './products-list.scss';

type Props = {
  products: Product[],
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="product-list" data-cy="cardsContainer">
      {products.map(product => (
        <li className="product-list__item" key={product.id}>
          <ProductCard
            product={product}
          />
        </li>
      ))}
    </ul>
  );
};
