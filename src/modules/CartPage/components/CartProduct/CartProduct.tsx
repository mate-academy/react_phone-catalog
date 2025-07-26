import { useCart } from '../../context/CartContext';
import styles from './CartProduct.module.scss';

type Props = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export const CartProduct = ({ id, name, price, quantity, image }: Props) => {
  const { addItem, removeItem, decreaseItemQuantity } = useCart();

  return (
    <div className={styles.product}>
      <div className={styles.product__primary}>
        <img
          className={styles.product__remove}
          onClick={() => removeItem(id)}
          src="/icons/Close.svg"
          alt="close"
        />
        <img
          className={styles.product__image}
          src={image}
          alt="product-image"
        />
        <p className={styles.product__name}>{name}</p>
      </div>

      <div className={styles.product__secondary}>
        <div className={styles.product__quantity}>
          <button
            onClick={() => decreaseItemQuantity(id)}
            className={styles.product__button}
          >
            -
          </button>
          <div className={styles.product__count}>{quantity}</div>
          <button
            onClick={() =>
              addItem({
                id: id,
                name: name,
                price: price,
                quantity: quantity,
                image: image,
              })
            }
            className={styles.product__button}
          >
            +
          </button>
        </div>
        <div className={styles.product__price}>{`$${price}`}</div>
      </div>
    </div>
  );
};
