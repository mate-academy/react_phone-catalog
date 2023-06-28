import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsList.scss';

type ProductsListProps = {
  products: Product[] ;
};

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <>
      <ul className="products-list" data-cy="productList">
        {products.map(product => (
          <li key={product.itemId}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
};
