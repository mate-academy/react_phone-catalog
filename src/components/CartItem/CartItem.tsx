import { Link } from 'react-router-dom';
import { RoundButton } from '../Buttons/RoundButton';
import { Icon } from '../Icon';
import { buildProductPath } from '../../utils/buildProductPath';
import { formatPrice } from '../../utils/formatPrice';
import { CartEntry } from '../../types/CartItem';
import {
  INCREASE_QTY,
  MIN_QTY,
  DECREASE_QTY,
} from '../../constants/Products/cart';
import style from './CartItem.module.scss';

type Props = {
  cartEntry: CartEntry;
  onDelete: (id: string) => void;
  updateQty: (id: string, qtyChange: number) => void;
};

export const CartItem: React.FC<Props> = ({
  cartEntry,
  onDelete,
  updateQty,
}) => {
  const { id, qty, product } = cartEntry;
  const { name, fullPrice, image, category, itemId } = product;

  const isDecreaseDisabled = qty <= MIN_QTY;

  const productPath = buildProductPath(category, itemId);

  return (
    <article className={style.cartItem}>
      <div className={style.infoRow}>
        <button
          className={style.removeButton}
          onClick={() => onDelete(id)}
          aria-label="Remove from cart"
        >
          <Icon name="close" />
        </button>
        <Link to={productPath}>
          <img src={image} className={style.productImg} alt={name} />
        </Link>

        <Link to={productPath} className={style.productTitle}>
          {name}
        </Link>
      </div>
      <div className={style.controlsRow}>
        <div className={style.qtyControls}>
          <RoundButton
            onClick={() => updateQty(id, DECREASE_QTY)}
            iconName="minus"
            ariaLabel="Decrease quantity"
            disabled={isDecreaseDisabled}
          />

          <p className={style.qty}>{qty}</p>

          <RoundButton
            onClick={() => updateQty(id, INCREASE_QTY)}
            iconName="plus"
            ariaLabel="Increase quantity"
          />
        </div>

        <strong className={style.price}>{formatPrice(fullPrice * qty)}</strong>
      </div>
    </article>
  );
};
