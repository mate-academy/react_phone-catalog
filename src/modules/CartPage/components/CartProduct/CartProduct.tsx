import React from 'react';
import { Cart } from '../../../../shared/store/CartProvider';
import styles from './CartProduct.module.scss';
import { ProductLoader } from '../../../../shared/components/ProductLoader/ProductLoader';

import CartDelete from '../../../../assets/icons/cart-icons/close-icon.svg';
import CartMinus from '../../../../assets/icons/cart-icons/minus-disabled.svg';
// eslint-disable-next-line
import CartMinusActive from '../../../../assets/icons/cart-icons/minus.svg';
import CartPlus from '../../../../assets/icons/cart-icons/plus.svg';

type Props = {
  cartProduct: Cart;
  isLoading: boolean;
  handleToDelete: (id: number) => Promise<void>;
  handleChangeQuantity: (id: number, amount: number) => void;
};

export const CartProduct: React.FC<Props> = ({
  cartProduct,
  isLoading,
  handleToDelete,
  handleChangeQuantity,
}) => {
  return (
    <div className={styles.cart__item}>
      <div className={styles.cart__description}>
        <button
          className={styles.cart__itemDeleteBtn}
          onClick={() => handleToDelete(cartProduct.id)}
        >
          <img
            className={styles.cart__itemDeleteImg}
            src={CartDelete}
            alt="Видалити товар з корзини"
            loading="lazy"
          />
        </button>
        <a href="#">
          <img
            src={cartProduct.product.image}
            alt="Фото товару"
            className={styles.cart__itemImage}
          />
        </a>
        <p className={styles.cart__itemDescription}>
          {cartProduct.product.name}
        </p>
      </div>
      <div className={styles.cart__toPay}>
        <div className={styles.cart__itemControl}>
          <button
            className={styles.cart__minusBtn}
            disabled={cartProduct.quantity === 1}
            onClick={() => {
              handleChangeQuantity(cartProduct.id, cartProduct.quantity - 1);
            }}
          >
            <img
              className={styles.cart__minusBtnImg}
              src={cartProduct.quantity === 1 ? CartMinus : CartMinusActive}
              alt="Зменшити кількість товару"
              loading="lazy"
            />
          </button>
          <p className={styles.cart__addedItems}>{cartProduct.quantity}</p>
          <button
            className={styles.cart__plusBtn}
            onClick={() => {
              handleChangeQuantity(cartProduct.id, cartProduct.quantity + 1);
            }}
          >
            <img
              className={styles.cart__plusBtnImg}
              src={CartPlus}
              alt="Збільшити кількість товару"
              loading="lazy"
            />
          </button>
        </div>
        <h3 className={styles.cart__price}>
          ${cartProduct.product.price * cartProduct.quantity}
        </h3>
      </div>
      {isLoading && (
        <div className={styles.cart__laoder}>
          <ProductLoader />
        </div>
      )}
    </div>
  );
};
