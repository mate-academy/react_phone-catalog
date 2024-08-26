import { ProductType } from '../../types/ProductType';
import { Product } from '../Product/Product';

type Props = {
  className?: string;
  products: ProductType[];
};

export const ProductsList: React.FC<Props> = ({ className = '', products }) => {
  return (
    <ul className={`products-list ${className}`.trim()}>
      {products.map(product => (
        <li className="products-list__item" key={product.id}>
          <Product product={product} />
        </li>
      ))}
    </ul>
  );
};
