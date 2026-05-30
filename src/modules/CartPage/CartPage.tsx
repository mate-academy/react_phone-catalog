import React, { useMemo, useState } from 'react';
import styles from './CartPage.module.scss';
import { BackLink } from '../../components/BackLink';
import { ButtonType } from '../../types/ButtonType';
import { Button } from '../../components/Button';
import { ProductsType } from '../../types/ProductsType';
import { useSaveProducts } from '../../context/SaveProductsContext';
import { Product } from '../../types/ProductType';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { useCategoriesRTK } from '../../hooks/useCategoriesRTK';

export type CartItem = Product & {
  quantity: number;
  sum: number;
};

export const CartPage = () => {
  const {
    isCart,
    toggleCart,
    cartIds,
    addCartQuantity,
    removeCartQuantity,
    cartQuantity,
    clearCart,
    allCartQuantity,
  } = useSaveProducts();
  const {
    categorie: products,
    loading,
    error,
  } = useCategoriesRTK(ProductsType.Products);

  const [showModalCheckout, setShowModalCheckout] = useState(false);

  const currentProducts = useMemo(
    () => products.filter(el => isCart(el.itemId)),
    [isCart, products],
  );

  const CartItem = ({ product }: { product: CartItem }) => {
    return (
      <div className={styles.cart__item}>
        <button
          className={`icon icon--close ${styles['cart__item-remove']}`}
          onClick={() => toggleCart(product.itemId)}
        />
        <div className={styles['cart__item-photo']}>
          <img
            src={product.image}
            alt={product.name}
            className={styles['cart__item-img']}
          />
        </div>
        <p className={`body-text ${styles['cart__item-title']}`}>
          {product.name}
        </p>
        <div className={styles['cart__item-counter']}>
          <Button
            isRatio={true}
            icon={ButtonType.Minus}
            onClick={() => removeCartQuantity(product.itemId)}
          />
          {product.quantity}
          <Button
            isRatio={true}
            icon={ButtonType.Plus}
            onClick={() => addCartQuantity(product.itemId)}
          />
        </div>
        <h3>${product.sum}</h3>
      </div>
    );
  };

  const visibleProducts = currentProducts.map(el => ({
    ...el,
    sum: cartQuantity(el.itemId) * el.price,
    quantity: cartQuantity(el.itemId),
  }));

  const allPrice = visibleProducts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.sum,
    0,
  );

  return (
    <div className="container">
      <div className={styles.cart__info}>
        <BackLink />
        <h1>Cart</h1>
      </div>

      {cartIds.length === 0 ? (
        <section className="section">
          <img
            className="not-found__img"
            src="img/cart-is-empty.png"
            alt="empty-cart"
          />
        </section>
      ) : loading ? (
        <Loader />
      ) : error ? (
        'error'
      ) : (
        <>
          <section className={`section ${styles.cart__block}`}>
            <div className={styles.cart__wrapper}>
              {visibleProducts.map(product => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>
            <div className={styles.cart__total}>
              <h2>${allPrice}</h2>
              <p className={`body-text ${styles['cart__total-count']}`}>
                Total for {allCartQuantity} items
              </p>
              <hr className={styles['cart__total-line']} />
              <Button
                className={`button-text ${styles['cart__total-checkout']}`}
                onClick={() => setShowModalCheckout(true)}
              >
                Checkout
              </Button>
            </div>
          </section>
          {showModalCheckout && (
            <Modal
              className={styles['cart-modal']}
              onCloseModal={setShowModalCheckout}
            >
              <h3>
                Checkout is not implemented yet. Do you want to clear the Cart?
              </h3>
              <div className={styles['cart-modal__buttons']}>
                <Button
                  className={styles['cart-modal__button']}
                  isSelected
                  onClick={() => setShowModalCheckout(false)}
                >
                  Cancel
                </Button>
                <Button
                  className={styles['cart-modal__button']}
                  onClick={() => clearCart()}
                >
                  Confirm
                </Button>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};
