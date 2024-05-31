import { useAppDispatch, useAppSelector } from '../../shared/hooks/hooks';
import styles from './ProductCartDetails.module.scss';
import * as actionCart from '../../../features/DetailsSlice';
import { useState } from 'react';

export const ProductCartDetails = () => {
  const { cartItem } = useAppSelector(state => state.selectedProduct);
  const [isModal, setIsModal] = useState(false);
  const dispatch = useAppDispatch();
  const fullPrice = cartItem.reduce(
    (acc, item) => acc + item.product?.price * item.quantity,
    0,
  );

  const fullItem = cartItem.reduce((acc, item) => acc + item.quantity, 0);
  const scrollFix = () => {
    const menu = document.getElementById('menu');

    if (isModal && menu) {
      menu.style.overflow = 'scroll';
    } else {
      if (menu) {
        menu.style.overflow = 'hidden';
      }
    }

    setIsModal(!isModal);
  };

  const deleteProduct = (id: string) => {
    dispatch(actionCart.deleteCart(id));
  };

  const addProductCount = (id: string) => {
    dispatch(actionCart.addCountProduct(id));
  };

  const minusProductCount = (id: string) => {
    dispatch(actionCart.minusCountProduct(id));
  };

  const clearProductCart = () => {
    dispatch(actionCart.clearCart());

    setIsModal(false);
    scrollFix();
  };

  return (
    <div className={styles.cart__container}>
      <div className={styles.cart__product}>
        <div className={styles.product}>
          {cartItem?.map(product => (
            <div
              key={product.product.itemId}
              className={styles.product__wraper}
            >
              <div className={styles.product__container}>
                <div
                  onClick={() => deleteProduct(product.id)}
                  className={styles.product__close}
                ></div>
                <img
                  className={styles.product__img}
                  src={product?.product.image}
                  alt="img"
                />
                <h3 className={styles.product__name}>
                  {product?.product.name}
                </h3>
              </div>
              <div className={styles.product__details}>
                <div className={styles.product__counter}>
                  <button
                    disabled={product.quantity === 1}
                    onClick={() => minusProductCount(product.id)}
                    className={`${styles.product__minus} ${styles.product__count}`}
                  ></button>
                  <div className={styles.product__number}>
                    {product.quantity}
                  </div>
                  <button
                    className={`${styles.product__plus} ${styles.product__count}`}
                    onClick={() => addProductCount(product.id)}
                  ></button>
                </div>
                <h3
                  className={styles.product__price}
                >{`$${product?.product.price}`}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.cart__wraper}>
        <h2 className={styles.cart__total}>{`$${fullPrice}`}</h2>
        <span className={styles.cart__item}>
          {`Total for ${fullItem} items`}
        </span>

        <div className={styles.cart__line}></div>

        <button
          className={styles.cart__button}
          onClick={() => {
            setIsModal(true);
            scrollFix();
          }}
        >
          Checkout
        </button>
      </div>
      {isModal && (
        <div className={styles.modal}>
          <h1 className={styles.modal__title}>
            Checkout is not implemented yet. Do you want to clear the Cart?
          </h1>
          <div className={styles.modal__container}>
            <button
              className={styles.cart__button}
              onClick={() => {
                setIsModal(false);
                scrollFix();
              }}
            >
              cancel
            </button>
            <button onClick={clearProductCart} className={styles.cart__button}>
              confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
