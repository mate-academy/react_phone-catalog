import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

import './ProductList.scss';

interface Props {
  products: Product[];
}

export const ProductList : React.FC<Props> = ({ products }) => {
  return (
    <div
      data-cy="cardsContainer"
      className="list"
    >
      <ul className="product">
        {products.map((product) => (
          <li
            key={product.id}
            className="product__item"
          >
            <ProductCard phone={product} />
          </li>
        ))}
      </ul>
    </div>

  );
};
