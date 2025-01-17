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
import { useState } from 'react';

interface Props {
  product: UpdatedProduct;
}

export const CartItem: React.FC<Props> = ({ product }) => {
  const [price, setPrice] = useState<number>(product.price * product.quantity);
  const { theme } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(removeItemFromCart(product.id));
  };

  const handleIncreaseQuantity = (itemId: number) => {
    dispatch(incrementItemQuantity(itemId));
    setPrice(prev => prev + product.price);
  };

  const handleDecreaseQuantity = (itemId: number) => {
    if (product.quantity === 1) {
      return;
    } else {
      setPrice(prev => prev - product.price);
    }

    dispatch(decrementItemQuantity(itemId));
  };

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
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              handleDecreaseQuantity(product.id);
            }}
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
          <div
            className={styles.plus}
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              handleIncreaseQuantity(product.id);
            }}
          >
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
            {`$${price}`}
          </p>
        </div>
      </div>
    </div>
  );
};
