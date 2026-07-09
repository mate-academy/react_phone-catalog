import { CartItem } from '../../contexts/cart';
import { useCart } from '../../hooks/useCart';
import styles from './CartItem.module.scss';
import close from '../../images/Icons/close-btn-gray.png';
import plus from '../../images/Icons/plus-white.svg';
import minusWhite from '../../images/Icons/minus-white.svg';
import minusGray from '../../images/Icons/minus-gray.svg';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  cartItem: CartItem;
};

export const CartItemCard: React.FC<Props> = ({ cartItem }) => {
  const { removeFromCart, updateCart } = useCart();

  const price = cartItem.product.price * cartItem.quantity;

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__productInfo}>
        <button
          className={styles.cartItem__removeBtn}
          onClick={() => removeFromCart(cartItem.product)}
        >
          <img src={close} alt="" />
        </button>
        <NavLink
          to={`/${cartItem.product.category}/${cartItem.product.itemId}`}
          className={styles.cartItem__img}
        >
          <img src={cartItem.product.image} alt="" />
        </NavLink>

        <NavLink
          to={`/${cartItem.product.category}/${cartItem.product.itemId}`}
          className={styles.cartItem__name}
        >
          {cartItem.product.name}
        </NavLink>
      </div>

      <div className={styles.cartItem__priceSettings}>
        <div className={styles.cartItem__quantityBox}>
          <button
            disabled={cartItem.quantity === 1}
            className={classNames(styles.cartItem__quantityBtn, {
              [styles.cartItem__btnOff]: cartItem.quantity === 1,
            })}
            onClick={() => updateCart(cartItem, '-')}
          >
            {cartItem.quantity > 1 ? (
              <img src={minusWhite} alt="" />
            ) : (
              <img src={minusGray} alt="" />
            )}
          </button>
          <p className={styles.quantity}>{cartItem.quantity}</p>
          <button
            className={styles.cartItem__quantityBtn}
            onClick={() => updateCart(cartItem, '+')}
          >
            <img src={plus} alt="" />
          </button>
        </div>

        <h3 className={styles.cartItem__price}>${price}</h3>
      </div>
    </div>
  );
};
