import { Product } from '../../Types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="product__list" data-cy="productList">
      {products.map((product: Product) => (
        <div key={product.phoneId} className="product-card product__product">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
