import { useNavigate } from 'react-router-dom';
import styles from './CartItems.module.scss';
import { useCart } from '../../contexts/CartContext';
import { useEffect, useMemo, useState } from 'react';
import { Products } from '../../types/Products';
import { getAllDetailedProducts } from '../../utils/api';
import { Loader } from '../Loader';

export const CartItems = () => {
  const [products, setProducts] = useState<Products[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const navigate = useNavigate();

  const {
    cartItems,
    totalQuantity,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  useEffect(() => {
    setLoader(true);
    getAllDetailedProducts()
      .then(setProducts)
      .catch(() => {
        setErrorMessage('Something wrong, please try again');
        setLoader(false);
      })
      .finally(() => setLoader(false));
  }, []);

  const devices = useMemo(() => {
    return (
      products?.filter(product =>
        cartItems.some(item => item.id === product.id),
      ) ?? []
    );
  }, [products, cartItems]);

  const getQuantity = (id: string) =>
    cartItems.find(item => item.id === id)?.quantity ?? 1;

  const sum = devices.reduce((total, device) => {
    const price = device.priceDiscount || device.priceRegular;

    return total + price * getQuantity(device.id);
  }, 0);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const confirmCheckout = () => {
    clearCart();
    setIsCheckoutOpen(false);
  };

  const cancelCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.navigation}>
        <button onClick={() => navigate(-1)}>
          <img src="./img/arrowLeft.svg" alt="arrowLeft" />
        </button>
        <p className={styles.text}>Back</p>
      </div>

      <div className={styles.phone}>
        <div className={styles.title}>
          <h1>Cart</h1>
        </div>
        {loader ? (
          <Loader />
        ) : errorMessage ? (
          <div className={styles.error}>{errorMessage}</div>
        ) : devices.length === 0 ? (
          <div className={styles.empty}>Your cart is empty</div>
        ) : (
          <div className={styles.cartsPage}>
            <div className={styles.cartsList}>
              {devices.map(device => {
                const quantity = getQuantity(device.id);

                return (
                  <div className={styles.cart} key={device.id}>
                    <img
                      src="img/close.svg"
                      alt="closeIcon"
                      className={styles.closeIcon}
                      onClick={() => removeFromCart(device.id)}
                    />
                    <img
                      src={`${device.images[0]}`}
                      alt={`${device.images[0]}`}
                      className={styles.cartPhoto}
                    />
                    <p className={styles.devicesName}>{device.name}</p>
                    <div className={styles.devicesCount}>
                      <button
                        onClick={() => decreaseQuantity(device.id)}
                        disabled={quantity <= 1}
                        className={styles.devicesButton}
                      >
                        <img src="img/minus.svg" alt="minusPhoto" />
                      </button>

                      <p>{quantity}</p>
                      <button
                        className={styles.devicesButton}
                        onClick={() => increaseQuantity(device.id)}
                      >
                        <img src="img/plus.svg" alt="plusPhoto" />
                      </button>
                    </div>
                    <p className={styles.devicesPrice}>
                      $
                      {(device.priceDiscount || device.priceRegular) * quantity}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className={styles.cartsBuy}>
              <div className={styles.cartsInfo}>
                <p className={styles.cartsPrice}>${sum}</p>
                <p className={styles.cartCounts}>
                  Total for {totalQuantity} items
                </p>
                <div className={styles.catalogButtons}>
                  <button
                    className={styles.buttonsBuy}
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isCheckoutOpen && (
        <div className={styles.modalOverlay} onClick={cancelCheckout}>
          <div
            className={styles.modal}
            onClick={event => event.stopPropagation()}
          >
            <p className={styles.modalText}>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>
            <div className={styles.modalButtons}>
              <button className={styles.buttonsBuy} onClick={confirmCheckout}>
                Clear cart
              </button>
              <button className={styles.button} onClick={cancelCheckout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
