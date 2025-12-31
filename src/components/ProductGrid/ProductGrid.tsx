import { Product } from '../../modules/shared/types/Product';
import { ProductCard } from '../ProductCard';
import style from './ProductGrid.module.scss';

export const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className={style.grid}>
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
