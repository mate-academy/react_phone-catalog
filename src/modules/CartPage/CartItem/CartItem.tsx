import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import styles from './CartItem.module.scss';
import { CartItemProps } from '../../../types/CartItemProps';
import {
  getDecreaseIconSrc,
  getRemoveIconSrc,
  getIncreaseIconSrc,
} from '../../../servises/iconSrc';
import { useTheme } from '../../../context/ThemeContext';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { BASE_URL } from '../../../utils/const';

type Props = {
  item: CartItemProps;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useAppContext();
  const { theme } = useTheme();
  const { product, quantity } = item;
  const { image, name, id, price, itemId } = product;

  const handleDeleteItem = () => {
    removeFromCart(id);
  };

  const deleteImgSrc = getRemoveIconSrc(theme);
  const degreaseImgSrc = getDecreaseIconSrc(theme);
  const increaseImgSrc = getIncreaseIconSrc(theme);

  return (
    <div className={styles.cartItem}>
      <div className={styles.mainContainer}>
        <button onClick={handleDeleteItem} className={styles.deleteButton}>
          <img
            src={deleteImgSrc}
            alt="Delete"
            className={styles.deleteButtonIcon}
          />
        </button>
        <Link to={`/products/${itemId}`} className={styles.productImage}>
          <img
            src={`${BASE_URL}/${image}`}
            alt={name}
            className={styles.image}
          />
        </Link>
        <h4>{name}</h4>
      </div>
      <div className={styles.quantityControl}>
        <div className={styles.quantity}>
          <button
            onClick={() => updateCartQuantity(id, -1)}
            disabled={quantity <= 1}
            className={classNames(styles.button, {
              [styles.disabled]: quantity <= 1,
            })}
          >
            <img
              src={degreaseImgSrc}
              alt="Decrease"
              className={styles.controlButtonIcon}
            />
          </button>
          <div className={styles.quantityValueContainer}>
            <p className={styles.quantityValue}>{quantity}</p>
          </div>
          <button
            onClick={() => updateCartQuantity(id, 1)}
            className={styles.button}
          >
            <img
              src={increaseImgSrc}
              alt="Increase"
              className={styles.controlButtonIcon}
            />
          </button>
        </div>
        <h3 className={styles.price}>${price}</h3>
      </div>
    </div>
  );
};
