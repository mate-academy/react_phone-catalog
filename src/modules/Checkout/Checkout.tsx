import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from './components/Form/Form';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { useCart } from '../../hooks/useCart';
import { useOrder } from '../../hooks/useOrder';
import { useTotalPrice } from '../../hooks/useTotalPrice';
import { imageUrl } from '../../utils/imageUrl';
import styles from './Checkout.module.scss';

export const Checkout = () => {
  const navigate = useNavigate();
  const { order, isInitialized } = useOrder();
  const { cart } = useCart();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!order.expiresAt) {
      return;
    }

    const interval = setInterval(() => {
      const diff = order.expiresAt! - Date.now();

      setTimeLeft(Math.max(diff, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [order.expiresAt]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!order.orderId) {
      navigate('/cart');

      return;
    }

    if (order.expiresAt && Date.now() > order.expiresAt) {
      navigate('/cart');
    }
  }, [isInitialized, order]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <Pagetoolbar
        title={`Your order #${order.orderId}`}
        subtitle={`Time remaining: ${formatTime(timeLeft)}`}
        back
      />
      <div className={styles.content}>
        <div className={styles.cart}>
          <h3 className={styles.title}>Your cart:</h3>
          <div className={styles.products}>
            {cart.map(item => {
              return (
                <div key={item.id} className={styles.product}>
                  <div className={styles.img}>
                    <img
                      src={imageUrl(item.product.image)}
                      alt=""
                      className={styles.img__photo}
                    />
                  </div>
                  <p className={styles.name}>{item.product.name}</p>
                  <p className={styles.amount}>Amount: {item.quantity}</p>
                  <p className={styles.price}>
                    Total price:{' '}
                    <strong>${item.product.price * item.quantity}</strong>
                  </p>
                </div>
              );
            })}
          </div>
          <p className={styles.total}>Total value to pay: ${useTotalPrice()}</p>
        </div>
        <Form />
      </div>
    </div>
  );
};
