import styles from './CartProduct.module.scss';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

export const CartProduct: React.FC<Props> = ({ product }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity, getQuantity } =
    useCart();

  const quantity = getQuantity(product.itemId);
  const totalPrice = product.price * quantity;

  return (
    <div className={styles.cartProduct}>
      <button
        className={styles.cartProduct__remove}
        onClick={() => removeFromCart(product.itemId)}
      >
        <img src="/img/Icons/delete-cart.svg" alt="Remove from cart" />
      </button>

      <Link
        to={`/${product.category}/${product.itemId}`}
        state={{ category: product.category, name: product.name }}
        className={styles.cartProduct__imageLink}
      >
        <img
          src={`/${product.image}`}
          alt={product.name}
          className={styles.cartProduct__image}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        state={{ category: product.category, name: product.name }}
        className={styles.cartProduct__name}
      >
        {product.name}
      </Link>

      <div className={styles.cartProduct__quantity}>
        <button
          className={styles.cartProduct__btn}
          onClick={() => decreaseQuantity(product.itemId)}
        >
          <img src="/img/Icons/minus.svg" alt="Decrease" />
        </button>

        <span className={styles.cartProduct__count}>{quantity}</span>

        <button
          className={styles.cartProduct__btn}
          onClick={() => increaseQuantity(product.itemId)}
        >
          <img src="/img/Icons/plus.svg" alt="Increase" />
        </button>
      </div>

      <span className={styles.cartProduct__price}>${totalPrice}</span>
    </div>
  );
};
