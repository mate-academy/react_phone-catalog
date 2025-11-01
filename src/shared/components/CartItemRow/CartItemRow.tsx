import { Link } from 'react-router-dom';
import type { ProductListItem } from '../../api/types';
import s from './CartItemRow.module.scss';
import CloseIcon from '../../../assets/Close.svg';
import MinusIcon from '../../../assets/Minus.svg';
import PlusIcon from '../../../assets/Plus.svg';

type Props = {
  product: ProductListItem;
  qty: number;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
};

export const CartItemRow: React.FC<Props> = ({
  product,
  qty,
  onInc,
  onDec,
  onRemove,
}) => {
  const subtotal = product.price * qty;

  return (
    <div className={s.row}>
      <div className={s.top}>
        <button className={s.remove} onClick={onRemove} aria-label="Remove">
          <img src={CloseIcon} alt="Remove" />
        </button>

        <Link to={`/product/${product.itemId}`} className={s.image}>
          <img src={`/${product.image}`} alt={product.name} />
        </Link>

        <Link to={`/product/${product.itemId}`} className={s.title}>
          {product.name}
        </Link>
      </div>

      <div className={s.bottom}>
        <div className={s.qty}>
          <button onClick={onDec} aria-label="Decrease">
            <img src={MinusIcon} alt="Decrease" />
          </button>
          <span>{qty}</span>
          <button onClick={onInc} aria-label="Increase">
            <img src={PlusIcon} alt="Increase" />
          </button>
        </div>

        <div className={s.price}>
          ${subtotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </div>
      </div>
    </div>
  );
};
