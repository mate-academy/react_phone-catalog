import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';

import s from './ProductList.module.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className={s.list}>
      {products.splice(1, 4).map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
