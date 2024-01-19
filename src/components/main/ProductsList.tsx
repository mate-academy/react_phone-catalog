import { Product } from '../../helpers/types/Product';
import { ProductCard } from './product-card/ProductCard';

type ProductsListProps = {
  products: Product[]
};

export const ProductsList = ({ products }: ProductsListProps) => (
  <ul className="products__list products-list" data-cy="productList">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </ul>
);
