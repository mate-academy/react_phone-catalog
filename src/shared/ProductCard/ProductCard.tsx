import { Product } from '../../types/product';
import s from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={s.card}>
      <div className={s.picture}>
        <img className={s.img} src={product.image} alt="Product image" />
      </div>
      <span>{product.name}</span>

      <span>{product.price}</span>

      <div>__</div>

      <div>
        <span>Screen</span>
        <span>{product.screen}</span>
      </div>
      <div>
        <span>Capacity</span>
        <span>{product.capacity}</span>
      </div>
      <div>
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
