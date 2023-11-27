import { Product } from '@typings/product';
import { ProductCard } from '@components/ProductCard';
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
