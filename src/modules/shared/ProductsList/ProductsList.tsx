import s from './ProductList.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../../utils/types/Product';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={s.productsList}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
