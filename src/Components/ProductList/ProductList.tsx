import { Product } from '../../Helpers/Types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.scss';

type Props = {
  products: Product [],
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div
      className="product-list product-list--margin"
      data-cy="productList"
    >
      <ProductCard products={products} />
    </div>
  );
};
