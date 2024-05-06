import React from 'react';
import styles from './CartItem.module.scss';
import { CartItemType } from '../../../../types/CartItemType';
import { icons } from '../../../../shared/global/Icons';
import { Link } from 'react-router-dom';
import { RoundedArrow } from '../../../../components/RoundedArrowBtn';
import { useAppDispatch } from '../../../../app/hook';
import {
  decrease,
  deleteFromCart,
  increase,
} from '../../../../features/cartSlice';

type Props = {
  cartItem: CartItemType;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { product, quantity, id } = cartItem;
  const dispatch = useAppDispatch();

  const handleDeleteItem = () => {
    dispatch(deleteFromCart(id));
  };

  const handleIncreaseCount = () => {
    dispatch(increase(id));
  };

  const handleDecreaseCount = () => {
    dispatch(decrease(id));
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemInfo}>
        <span onClick={handleDeleteItem} className={styles.cartBtn}>
          {icons.close}
        </span>

        <Link
          to={`/${product.category}/${product.id}`}
          className={styles.cartItemImgWrap}
        >
          <img
            src={product.images?.[0] || 'default-image-url.jpg'} // Provide a fallback image URL
            alt={product.namespaceId}
            className={styles.cartItemImg}
          />
        </Link>

        <Link
          to={`/${product.category}/${product.id}`}
          className={styles.cartItemName}
        >
          {product.name}
        </Link>
      </div>

      <div className={styles.cartItemCountWrap}>
        <div className={styles.cartItemCount}>
          <span onClick={handleDecreaseCount}>
            <RoundedArrow icon={icons.minusDis} disabled={quantity <= 1} />
          </span>

          <span className={styles.cartItemQuantity}>{quantity}</span>

          <span onClick={handleIncreaseCount}>
            <RoundedArrow icon={icons.plus} />
          </span>
        </div>
        <p className={styles.cartItemPrice}>
          {product.priceDiscount
            ? `$${product.priceDiscount}`
            : `$${product.priceRegular}`}
        </p>
      </div>
    </div>
  );
};
