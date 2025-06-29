import styles from './CartItem.module.scss';

import { Link } from 'react-router-dom';

import { useUserActionsDispatch } from '../../context/useUserActions';
import { CartItemType } from '../../types/CartItemType';

import closeIcon from '../../images/icons/close.svg';
import minusIcon from '../../images/icons/minus.svg';
import plusIcon from '../../images/icons/plus.svg';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { product, quantity } = item;
  const { name, image, category, itemId, price } = product;

  const dispatch = useUserActionsDispatch();

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product.id });
  };

  const handleDecrease = () => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: product.id });
  };

  const handleIncrease = () => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: product.id });
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__main}>
        <button
          className={styles.cartItem__remove}
          onClick={handleRemove}
          aria-label="Remove from cart"
        >
          <img
            className={styles.cartItem__removeImg}
            src={closeIcon}
            alt="Remove"
          />
        </button>

        <Link
          to={`/${category}/${itemId}`}
          className={styles.cartItem__imageNameLink}
        >
          <div className={styles.cartItem__imageWrapper}>
            <img src={image} alt="cart" className={styles.cartItem__image} />
          </div>

          <h3 className={styles.cartItem__name}>{name}</h3>
        </Link>
      </div>

      <div className={styles.cartItem__details}>
        <div className={styles.cartItem__quantity}>
          <button
            className={styles.cartItem__quantityButton}
            onClick={handleDecrease}
            disabled={quantity === 1}
          >
            <img src={minusIcon} alt="Decrease quantity" />
          </button>

          <span className={styles.cartItem__quantityValue}>{quantity}</span>

          <button
            className={styles.cartItem__quantityButton}
            onClick={handleIncrease}
          >
            <img src={plusIcon} alt="Increase quantity" />
          </button>
        </div>

        <h3 className={styles.cartItem__price}>${price}</h3>
      </div>
    </div>
  );
};
