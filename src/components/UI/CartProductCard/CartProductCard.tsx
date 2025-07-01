import React from 'react';
import styles from './CartProductCard.module.scss';
import CloseIcon from 'assets/icons/CloseIcon.svg?react';
import Minus from 'assets/icons/Minus.svg?react';
import Plus from 'assets/icons/Plus.svg?react';
import { CartItem, useCart } from '@/context/CartContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type Props = {
  product: CartItem;
};

export const CartProductCard: React.FC<Props> = ({ product }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();
  const { t } = useTranslation();

  const handleRemoveFromCart = () => {
    removeFromCart(product.itemId);
    toast.warn(`${product.name} removed from cart.`);
  };

  const translatedName = t(`products.${product.itemId}.name`, product.name);

  return (
    <div className={styles.card}>
      <div className={styles.cardWrapper}>
        <div className={styles.productInfo}>
          <button
            className={styles.btnRemoveProduct}
            onClick={handleRemoveFromCart}
          >
            <CloseIcon className={styles.btnRemoveProductIcon} />
          </button>
          <img
            src={product.image}
            className={styles.productImage}
            alt="Product image in cart"
          />
          <p className={styles.productName}>{translatedName}</p>
        </div>
        <div className={styles.quantityPrice}>
          <div className={styles.counterProduct}>
            <button
              className={styles.btnDecrementCounter}
              onClick={() => decrementQuantity(product.itemId)}
              disabled={product.quantity <= 1}
            >
              <Minus className={styles.btnDecrementCounterIcon} />
            </button>
            <p className={styles.productQuantity}>{product.quantity}</p>
            <button
              className={styles.btnIncrementCounter}
              onClick={() => incrementQuantity(product.itemId)}
            >
              <Plus className={styles.btnIncrementCounterIcon} />
            </button>
          </div>

          <h3 className={styles.productPrice}>
            ${product.price * product.quantity}
          </h3>
        </div>
      </div>
    </div>
  );
};
