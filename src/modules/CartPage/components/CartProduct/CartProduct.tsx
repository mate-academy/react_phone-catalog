import React from 'react';

import styles from './CartProduct.module.scss';

import { ProductLoader } from '../../../../shared/components/ProductLoader';
import { Link } from 'react-router-dom';

// eslint-disable-next-line
import CartDelete from '../../../../assets/icons/cart-icons/cart-delete-icons.svg';
import CartMinus from '../../../../assets/icons/cart-icons/cart-minus-icon.svg';
// eslint-disable-next-line
import CartMinusActive from '../../../../assets/icons/cart-icons/cart-minus-icon-active.svg';
import CartPlus from '../../../../assets/icons/cart-icons/cart-plus-icon.svg';
import { Cart } from '../../../../store/cartSlice/cartSlice';

type Props = {
  cartProduct: Cart;
  isLoading: boolean;
  deleteProduct: (id: number) => Promise<void>;
  changeQuantity: (id: number, amount: number) => void;
};

export const CartProduct: React.FC<Props> = ({
  cartProduct,
  isLoading,
  deleteProduct,
  changeQuantity,
}) => {
  return (
    <div className={styles.cart__item}>
      <div className={styles.cart__description}>
        <button
          className={styles.cart__itemDeleteBtn}
          onClick={() => deleteProduct(cartProduct.product.id)}
          aria-label="Видалити товар з корзини"
        >
          <img
            className={styles.cart__itemDeleteImg}
            src={CartDelete}
            alt="Видалити товар з корзини"
            loading="lazy"
          />
        </button>
        <Link
          to={`/${cartProduct.product.category}/${cartProduct.product.itemId}`}
        >
          <img
            className={styles.cart__itemImage}
            src={cartProduct.product.image}
            alt="Фото товару"
            loading="lazy"
          />
        </Link>

        <p className={styles.cart__itemDescription}>
          {cartProduct.product.name}
        </p>
      </div>
      <div className={styles.cart__toPay}>
        <div className={styles.cart__itemControl}>
          <button
            className={styles.cart__minusBtn}
            disabled={cartProduct.quantity === 1}
            aria-label="Зменшити кількість товару"
            onClick={() =>
              changeQuantity(cartProduct.product.id, cartProduct.quantity - 1)
            }
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
            aria-label="Збільшити кількість товару"
            onClick={() =>
              changeQuantity(cartProduct.product.id, cartProduct.quantity + 1)
            }
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
          {`$${cartProduct.quantity * cartProduct.product.price}`}
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
