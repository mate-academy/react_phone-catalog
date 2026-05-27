import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductList.scss';

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div className="products-list">
      {products.map(product => (
        <article className="products-list__item" key={product.id}>
          <ProductCard product={product} />
        </article>
      ))}
    </div>
  );
};
