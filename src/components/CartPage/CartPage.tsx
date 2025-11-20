import React from 'react';
import styles from './CartPage.module.scss';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import closeImg from '../../../public/icons/Close.svg';
import iconBack from '../../../public/icons/Vector (Stroke).svg';
import { getImgUrl } from '../../utils/getImgUrl';

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const increaseQty = (id: string | number) => {
    const item = cartItems.find(i => i.id === id);

    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decreaseQty = (id: string | number) => {
    const item = cartItems.find(i => i.id === id);

    if (item) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) =>
        total + (item.priceDiscount || item.priceRegular || 0) * item.quantity,
      0,
    );
  };

  return (
    <div className={styles.cart}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img src={iconBack} alt="back" className={styles.icon__back} />
        <div className={styles.navText__1}>Back</div>
      </button>
      <h1 className={styles.title}>Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Your cart is empty 😔</p>
      ) : (
        <div className={styles.container}>
          <div className={styles.items}>
            {cartItems.map(product => (
              <div key={product.id} className={styles.item}>
                <div className={styles.itemMobileTop}>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className={styles.remove}
                  >
                    <img
                      src={closeImg}
                      className={styles.closeButton}
                      alt="closeImage"
                    />
                  </button>
                  <img
                    src={getImgUrl(product.images?.[0] || '')}
                    alt={product.name}
                    className={styles.image}
                  />
                  <p className={styles.name}>{product.name}</p>
                </div>

                <div className={styles.itemMobileBot}>
                  <div className={styles.qty}>
                    <button
                      className={styles.btnDecrease}
                      onClick={() => decreaseQty(product.id)}
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      className={styles.btnIncrease}
                      onClick={() => increaseQty(product.id)}
                    >
                      +
                    </button>
                  </div>

                  <p className={styles.price}>
                    $
                    {(product.priceDiscount || product.priceRegular) *
                      product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <p className={styles.totalPrice}>${getTotalPrice()}</p>
            <p className={styles.totalItems}>
              Total for {cartItems.length}{' '}
              {cartItems.length === 1 ? 'item' : 'items'}
            </p>
            <div className={styles.border}></div>
            <button className={styles.checkout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};
