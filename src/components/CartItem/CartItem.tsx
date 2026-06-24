import { useCart } from '../../hooks/ContextHook';
import { CartProduct } from '../../types/Product';
import s from './CartItem.module.scss';
import close from '../../assets/images/icons/Close.svg';
import plus from '../../assets/images/icons/Plus.svg';
import minus from '../../assets/images/icons/Minus.svg';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  item: CartProduct;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const isMinQuantity = item.quantity === 1;

  return (
    <div className={s.itemBlock}>
      <div className={s.itemDescription}>
        <button className={s.deleteButton} onClick={() => removeFromCart(item.id)}>
          <img src={close} alt="close" className={s.closeIcon} aria-label="Remove from cart" />
        </button>
        <Link className={s.navItem} to={`/product/${item.product.itemId}`}>
          <div className={s.imageWrapper}>
            <img src={item.product.image} alt="productImg" className={s.imageItem} />
          </div>
          <span className={s.itemTitle}>{item.product.name}</span>
        </Link>
      </div>

      <div className={s.itemTotal}>
        <div className={s.cartItemQuantity}>
          <button
            className={classNames(s.quantityButton, { [s.disabled]: isMinQuantity })}
            onClick={() => updateQuantity(item.id, -1)}
            disabled={isMinQuantity}
            aria-label="Decrease quantity"
          >
            <img src={minus} alt="minus" />
          </button>
          <span className={s.quantity}>{item.quantity}</span>
          <button
            className={classNames(s.quantityButton)}
            onClick={() => updateQuantity(item.id, 1)}
            aria-label="Increase quantity"
          >
            <img src={plus} alt="plus" />
          </button>
        </div>
        <h3 className={s.totalPrice}>${item.product.price * item.quantity}</h3>
      </div>
    </div>
  );
};
