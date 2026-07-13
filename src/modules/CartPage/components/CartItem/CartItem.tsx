import React from 'react';
import { useCart } from '../../../../context/CartContext';
import styles from './CartItem.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  image: string;
  price: number;
  quantity: number;
  id: string;
}

export const CartItem: React.FC<Props> = ({
  name,
  image,
  price,
  quantity,
  id,
}) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className={styles.cartItem}>
      <div className={styles.leftSector}>
        <button
          className={styles.deleteButton}
          onClick={() => removeFromCart(id)}
        >
          <img src="/img/icons/icon_delete.svg" alt="" />
        </button>

        <Link to={`/product/${id}`} className={styles.productImage}>
          <img src={image} alt="" />
        </Link>

        <Link to={`/product/${id}`} className={styles.productName}>
          <p className={styles.nameText}>{name}</p>
        </Link>
      </div>

      <div className={styles.rightSector}>
        <div className={styles.quantitySector}>
          <button
            className={classNames(
              styles.quantityButton,
              quantity === 1 && styles.quantityDisabled,
            )}
            onClick={() => updateQuantity(id, -1)}
            disabled={quantity === 1}
          >
            <img src="/img/icons/icon_minus.svg" alt="" />
          </button>
          <p className={styles.quantityText}>{quantity}</p>
          <button
            className={styles.quantityButton}
            onClick={() => updateQuantity(id, 1)}
          >
            <img src="/img/icons/icon_plus.svg" alt="" />
          </button>
        </div>

        <div className={styles.priceSector}>
          <h3 className={styles.priceText}>${price}</h3>
        </div>
      </div>
    </div>
  );
};
