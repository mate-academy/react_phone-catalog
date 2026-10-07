import styles from './CartItem.module.scss';
import { CartItem as CartItemType, useCart } from '../../context/CartContext';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item__context}>
        <button
          type="button"
          onClick={() => removeFromCart(item.id)}
          className={styles.cart_item__context__button}
        >
          <img src="/img/icons/grey_close.svg" alt="Remove" />
        </button>

        <Link
          to={`/product/${item.product.itemId}`}
          className={styles.cart_item__context__link}
        >
          <img
            className={styles.cart_item__context__img_product}
            src={`/${item.product.image}`}
            alt={item.product.name}
          />
          <h2 className={styles.cart_item__context__text_title}>
            {item.product.name}
          </h2>
        </Link>
      </div>

      <div className={styles.cart_item__buttons}>
        <button
          className={styles.cart_item__buttons__minus}
          type="button"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <img
            className={classNames(styles.cart_item__buttons__minus__img, {
              [styles.cart_item__buttons__minus__img_disabled]:
                item.quantity === 1,
            })}
            src="/img/icons/minus.svg"
            alt="Decrease quantity"
          />
        </button>

        <p className={styles.cart_item__buttons__text}>{item.quantity}</p>

        <button
          className={styles.cart_item__buttons__plus}
          type="button"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <img
            className={styles.cart_item__buttons__plus__img}
            src="/img/icons/plus.svg"
            alt="Increase quantity"
          />
        </button>

        <h2 className={styles.cart_item__buttons__title_price}>
          ${item.product.price}
        </h2>
      </div>
    </div>
  );
};
