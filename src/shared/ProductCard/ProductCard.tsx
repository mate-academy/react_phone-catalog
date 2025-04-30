import { Product } from '../../types/product';
import s from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={s.card}>
      <h1>{product.name}</h1>
    </div>
  );
};
