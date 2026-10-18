import { Link } from 'react-router-dom';
import { Icon } from '../../../../components/Icon';
import { useCart } from '../../../../context';
import { CartItem as CartItemType } from '../../../../types';
import styles from './CartItem.module.scss';

export const CartItem = ({ item }: { item: CartItemType }) => {
  const { removeFromCart, changeQuantity } = useCart();
  const { product, quantity } = item;
  const productLink = `/product/${product.itemId}`;

  return (
    <article className={styles['cart-item']}>
      <button
        type="button"
        className={styles['cart-item__remove']}
        aria-label="Remove from cart"
        onClick={() => removeFromCart(item.id)}
      >
        <Icon name="close" />
      </button>

      <Link to={productLink} className={styles['cart-item__image-link']}>
        <img
          src={product.image}
          alt={product.name}
          className={styles['cart-item__image']}
        />
      </Link>

      <Link to={productLink} className={styles['cart-item__title']}>
        {product.name}
      </Link>

      <div className={styles['cart-item__quantity']}>
        <button
          type="button"
          className={styles['cart-item__counter-button']}
          disabled={quantity === 1}
          aria-label="Decrease quantity"
          onClick={() => changeQuantity(item.id, -1)}
        >
          <Icon name="minus" />
        </button>

        <span className={styles['cart-item__count']}>{quantity}</span>

        <button
          type="button"
          className={styles['cart-item__counter-button']}
          aria-label="Increase quantity"
          onClick={() => changeQuantity(item.id, 1)}
        >
          <Icon name="plus" />
        </button>
      </div>

      <p className={styles['cart-item__price']}>${product.price * quantity}</p>
    </article>
  );
};
