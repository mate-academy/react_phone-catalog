import { Link } from 'react-router-dom';

import styles from './Cart.module.scss';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, totalQuantity, clearCart } =
    useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleClearCart = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (cart.length === 0) {
    return (
      <div className={styles.containerEmpty}>
        <img
          src="/img/cart-is-empty.png"
          alt="empty"
          className={styles.emptyImg}
        />
        <p className={styles.emptyText}>Your cart is empty</p>
        <Link to="/" className={styles.backHome}>
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <Link to="/" className={styles.home}>
        <button className={styles.homeButton}>
          <img src="/img/home.svg" alt="home" className={styles.homeImg} />
          <img src="/img/arrow.svg" alt="arrow" className={styles.arrow} />
          <span className={styles.homeGoTo}>Cart</span>
        </button>
      </Link>
      <h1 className={styles.titleContainer}>Cart</h1>
      <div className={styles.gridContainer}>
        <div className={styles.gridCartBlock}>
          <div className={styles.cartItem}>
            {cart.map(item => (
              <article key={item.product.itemId} className={styles.cartBlock}>
                <div className={styles.cartWithOutPrice}>
                  <button
                    type="button"
                    className={styles.buttonClose}
                    onClick={() => removeFromCart(item.product)}
                  >
                    <img
                      className={styles.imgClose}
                      src="./img/union.svg"
                      alt="close"
                    />
                  </button>
                  {/* <Link
                  to={`/${item.product.category}/${item.product.itemId}`}
                  className={styles.productLink} */}
                  {/* > */}
                  <img
                    className={styles.imgCartBlock}
                    src={item.product.image}
                    alt={item.product.name}
                  />
                  <div className={styles.cartNameBlock}>
                    <h3 className={styles.cartName}>{item.product.name}</h3>
                  </div>
                  {/* </Link> */}
                </div>

                <div className={styles.cardGroup}>
                  <div className={styles.cardButtonGroup}>
                    <button
                      type="button"
                      className={styles.buttonMinus}
                      onClick={() =>
                        updateQuantity(item.product, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      className={styles.buttonPlus}
                      onClick={() =>
                        updateQuantity(item.product, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.cardPriceGoup}>
                    <span className={styles.cardPriceHot}>
                      ${item.product.price}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.totalPriceBlock}>
          <div className={styles.cardTotal}>
            <strong className={styles.totalPrice}>${totalPrice}</strong>
            <p className={styles.cardTotalFor}>
              Total for {totalQuantity} item
            </p>
          </div>
          <span className={styles.underLine}></span>
          <button className={styles.checkOut} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3>Checkout is not implemented yet.</h3>
              <p className={styles.modalClear}>
                Do you want to clear the Cart?
              </p>
              <div className={styles.modalButton}>
                <button className={styles.modalCancel} onClick={handleCancel}>
                  Cancel
                </button>
                <button onClick={handleClearCart}>Clear Cart</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
