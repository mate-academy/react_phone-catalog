import { Product } from '../../types/product';
import s from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={s.card}>
      <img className={s.img} src={product.image} alt="Product image" />
      <span className={s.name}>{product.name}</span>

      <span>{product.price}</span>

      <div>__</div>

      <div className={s.parametrs}>
        <span>Screen</span>
        <span>{product.screen}</span>
      </div>
      <div className={s.parametrs}>
        <span>Capacity</span>
        <span>{product.capacity}</span>
      </div>
      <div className={s.parametrs}>
        <span>Ram</span>
        <span>{product.ram}</span>
      </div>

      <div>
        <button>buy</button>
        <button>like</button>
      </div>
    </div>
  );
};
