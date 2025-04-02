import { Product } from '../../types/Product';
import styles from './CartItem.module.scss';
import { useCart } from '../../context/CartContext';
import deleteIcon from '/img/icons/close.svg';
import minusIcon from '/img/icons/minus.svg';
import plusIcon from '/img/icons/plus.svg';

type Props = {
  product: Product;
  isHotPriceBlock?: boolean;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    deleteProductFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useCart();

  const handleDeleteProductFromCart = () => {
    deleteProductFromCart(product);
  };

  const handleDecreaseQuantity = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseQuantity = () => {
    increaseProductQuantity(product.id);
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__leftPart}>
        <div
          className={styles.cart__delete}
          onClick={handleDeleteProductFromCart}
        >
          <img src={deleteIcon} alt="delete icon" />
        </div>
        <div className={styles.cart__image}>
          <img src={`../../../public/${product.image}`} alt="image" />
        </div>
        <p className={styles.cart__name}>{product.name}</p>
      </div>

      <div className={styles.cart__rightPart}>
        <div className={styles.cart__count}>
          <button
            className={`${styles.cart__minus} ${product.quantity === 1 && styles.cart__minus_disabled}`}
            onClick={handleDecreaseQuantity}
            disabled={product.quantity === 1}
          >
            <img src={minusIcon} alt="minus icon" />
          </button>
          <div className={styles.cart__quantity}>{product.quantity ?? 1}</div>
          <button
            className={`${styles.cart__plus}`}
            onClick={handleIncreaseQuantity}
          >
            <img src={plusIcon} alt="plus icon" />
          </button>
        </div>

        <div className={styles.cart__price}>${product.price}</div>
      </div>
    </div>
  );
};
