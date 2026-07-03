// #region imports
import { Link } from 'react-router-dom';
import { CloseIcon } from '../../../shared/components/CloseIcon';
import { useCart } from '../../../shared/hooks/useCart';
import { QuantityControls } from '../QuantityControls/QuantityControls';
import { CartItem as Item } from '../../../shared/types/CartItem';
import baseStyles from './base.module.scss';
import styles from './CartItem.module.scss';
// #endregion

type Props = {
  cartItem: Item;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { id, product, quantity } = cartItem;
  const { removeFromCart, increase, decrease } = useCart(id);

  return (
    <div className={baseStyles.cartItem}>
      <div className={baseStyles.main}>
        <button className={styles.deleteBtn} onClick={removeFromCart}>
          <CloseIcon type="delete" />
        </button>

        <Link
          to={`/product/${id}`}
          className={`${baseStyles.imgFrame} ${styles.imgFrame}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </Link>

        <Link to={`/product/${id}`} className={styles.name}>
          {product.name}
        </Link>
      </div>

      <div className={baseStyles.cost}>
        <QuantityControls
          quantity={quantity}
          onIncrease={increase}
          onDecrease={decrease}
        />

        <span className={styles.price}>{`$${product.price}`}</span>
      </div>
    </div>
  );
};
