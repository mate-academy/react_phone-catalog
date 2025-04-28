import { useContext, useState } from 'react';

import styles from './CartPage.module.scss';

import {
  CartDispatchContext,
  CartStateContext,
} from '../../shared/store/CartProvider';
import { Dialog } from './components/Dialog';

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartsProduct = useContext(CartStateContext);
  const dispatchCart = useContext(CartDispatchContext);

  const totalPrice = cartsProduct.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const totalItems = cartsProduct.reduce((acc, item) => acc + item.quantity, 0);

  const handleDeleteProduct = (id: number) => {
    dispatchCart({ type: 'deleteCartProduct', payload: id });
  };

  const handleChangeQuantity = (id: number, amount: number) => {
    dispatchCart({
      type: 'updateCartProductQuantity',
      payload: { id, amount },
    });
  };

  return (
    <main className={styles.cart}>
      {isModalOpen && <Dialog setIsModalOpen={setIsModalOpen} />}
      <div className={styles.cart__container}>
        <div className={styles.cart__wrapper}>
          <div className={styles.cart__backButtonWrapper}>
            <img
              src="src/assets/icons/cart-icons/cart-arrow-icon.svg"
              alt="Back to previous page"
              className={styles.cart__backArrowImg}
            />
            <a href="#" className={styles.cart__backButton}>
              Back
            </a>
          </div>
          <h1 className={styles.cart__title}>Cart</h1>
        </div>

        {cartsProduct.length > 0 ? (
          <section className={styles.cart__items}>
            <div className={styles.cart__itemsWrapper}>
              {cartsProduct.map(cartProduct => (
                <div className={styles.cart__item} key={cartProduct.id}>
                  <div className={styles.cart__description}>
                    <button
                      className={styles.cart__itemDeleteBtn}
                      onClick={() =>
                        handleDeleteProduct(cartProduct.product.id)
                      }
                    >
                      <img
                        className={styles.cart__itemDeleteImg}
                        src="src/assets/icons/cart-icons/cart-delete-icons.svg"
                        alt="Видалити товар з корзини"
                      />
                    </button>
                    <img
                      className={styles.cart__itemImage}
                      src={cartProduct.product.image}
                      alt="Фото товару"
                    />

                    <p className={styles.cart__itemDescription}>
                      {cartProduct.product.name}
                    </p>
                  </div>
                  <div className={styles.cart__toPay}>
                    <div className={styles.cart__itemControl}>
                      <button
                        className={styles.cart__minusBtn}
                        onClick={() =>
                          handleChangeQuantity(
                            cartProduct.product.id,
                            cartProduct.quantity - 1,
                          )
                        }
                        disabled={cartProduct.quantity === 1}
                      >
                        <img
                          className={styles.cart__minusBtnImg}
                          src={`src/assets/icons/cart-icons/${cartProduct.quantity === 1 ? 'cart-minus-icon.svg' : 'cart-minus-icon-active.svg'}`}
                          alt=""
                        />
                      </button>
                      <p className={styles.cart__addedItems}>
                        {cartProduct.quantity}
                      </p>
                      <button
                        className={styles.cart__plusBtn}
                        onClick={() =>
                          handleChangeQuantity(
                            cartProduct.product.id,
                            cartProduct.quantity + 1,
                          )
                        }
                      >
                        <img
                          className={styles.cart__plusBtnImg}
                          src="src/assets/icons/cart-icons/cart-plus-icon.svg"
                          alt=""
                        />
                      </button>
                    </div>
                    <h3 className={styles.cart__price}>
                      {`$${cartProduct.quantity * cartProduct.product.price}`}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.cart__totalPrice}>
              <ul className={styles.cart__listItems}>
                <li className={styles.cart__listItemPrice}>${totalPrice}</li>
                <li
                  className={styles.cart__listItemInfo}
                >{`Total for ${totalItems} items`}</li>
              </ul>
              <span className={styles.cart__line}></span>
              <button
                className={styles.cart__checkout}
                onClick={() => setIsModalOpen(true)}
              >
                Checkout
              </button>
            </div>
          </section>
        ) : (
          <h2 className={styles.cart__emptyTitle}>Your cart is empty</h2>
        )}
      </div>
    </main>
  );
};
