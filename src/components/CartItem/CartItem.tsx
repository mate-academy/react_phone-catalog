import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { UpdatedProduct } from '../../types/UpdatedProduct';
import styles from './CartItem.module.scss';
import closeLight from '../../images/icon-close-light-theme.svg';
import closeDark from '../../images/icon-close-dark-theme.svg';
import minusLight from '../../images/icon-minus-light-theme.svg';
import minusDark from '../../images/icon-minus-dark-theme.svg';
import plusLight from '../../images/icon-plus-light-theme.svg';
import plusDark from '../../images/icon-plus-dark-theme.svg';
import { Link } from 'react-router-dom';
import {
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
} from '../../features/cartSlice';

interface Props {
  product: UpdatedProduct;
}

export const CartItem: React.FC<Props> = ({ product }) => {
  const { theme } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(removeItemFromCart(product.id));
  };

  const handleIncreaseQuantity = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(incrementItemQuantity(product.id));
  };

  const handleDecreaseQuantity = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (product.quantity > 1) {
      dispatch(decrementItemQuantity(product.id));
    }
  };

  const totalPrice = product.price * product.quantity;

  return (
    <div className={styles.cartItem}>
      <div className={styles.imgTitleBlock}>
        <button
          className={styles.closeBlock}
          onClick={handleRemoveItem}
          aria-label="Remove Item"
        >
          <img
            src={theme === 'light' ? closeLight : closeDark}
            alt="Close"
            className={styles.closeIcon}
          />
        </button>

        <Link
          to={`/${product.category}/:${product.itemId}`}
          className={styles.productPhotoLink}
        >
          <img
            className={styles.prodImg}
            src={product.image}
            alt="Product Image"
          />
        </Link>

        <p className={styles.title}>{product.name}</p>
      </div>

      <div className={styles.quantityPriceBlock}>
        <div className={styles.quantityBlock}>
          <div
            className={`${styles.minus} ${
              product.quantity === 1 ? styles.minus__disabled : ''
            }`}
            onClick={handleDecreaseQuantity}
          >
            <img
              src={theme === 'light' ? minusLight : minusDark}
              className={styles.minusIcon}
              alt="Minus Icon"
            />
          </div>
          <div
            className={styles.count}
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
            }}
          >
            {product.quantity}
          </div>
          <div className={styles.plus} onClick={handleIncreaseQuantity}>
            <img
              src={theme === 'light' ? plusLight : plusDark}
              className={styles.plusIcon}
              alt="Plus Icon"
            />
          </div>
        </div>
        <div className={styles.priceBlock}>
          <p
            className={styles.price}
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
            }}
          >
            {`$${totalPrice}`}
          </p>
        </div>
      </div>
    </div>
  );
};
