import { Products } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import s from './ProductsList.module.scss';

type Props = {
  products: Products[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={s.content}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
