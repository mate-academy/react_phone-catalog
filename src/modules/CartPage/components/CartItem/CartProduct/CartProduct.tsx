import { Product } from '@/shared/types/Product';
import styles from '../CartProduct.module.scss';
import { useCart } from '@/shared/context/CartContext/useCart';

type Props = { product: Product };

export const CartProduct: React.FC<Props> = ({ product }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity, cart } =
    useCart();

  const productInCart = cart.find(
    item => item.product.itemId === product.itemId,
  );

  const productQuantity = productInCart?.quantity ?? 1;
  const totalProductPrice = productQuantity * product.price;

  return (
    <div className={styles.item}>
      <div className={styles.item__details}>
        <button
          className={styles.removeItem}
          onClick={() => removeFromCart(product.itemId)}
        >
          <img
            className={styles.cross}
            src={'./icons/Close.svg'}
            alt="remove item"
          />
        </button>
        <div className={styles.imgBlock}>
          <img
            src={product.image}
            className={styles.image}
            alt="product image"
          />
        </div>
        <div className={styles.infoBlock}>
          <p className={styles.info}>{product.name}</p>
        </div>
      </div>
      <div className={styles.actionsWrapper}>
        <div className={styles.item__actions}>
          <div className={styles.quantityBlock}>
            <button
              disabled={productQuantity <= 1}
              className={`${styles.actionButton} ${
                productQuantity <= 1 ? styles.disabled : ''
              }`}
              type="button"
              onClick={() => decreaseQuantity(product.itemId)}
            >
              <img src={'./icons/Minus.svg'} alt="minus" />
            </button>

            <div className={styles.quantityNumberBlock}>
              <p>{productQuantity}</p>
            </div>

            <button
              className={styles.actionButton}
              type="button"
              onClick={() => increaseQuantity(product.itemId)}
            >
              <img src={'./icons/Plus.svg'} alt="plus" />
            </button>
          </div>
          <div className={styles.priceBlock}>
            <div className={styles.price}>${totalProductPrice}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
