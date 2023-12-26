import { Product } from '../../helpers/types';
import { ProductCard } from '../ProductCard';

import './ProductList.scss';

type Props = {
  productsList: Product[]
};

export const ProductList: React.FC<Props> = ({ productsList }) => {
  return (
    <ul className="product-list" data-cy="productList">
      {productsList.map((currProduct: Product) => (
        <li key={currProduct.id}>
          <ProductCard product={currProduct} />
        </li>
      ))}
    </ul>
  );
};
