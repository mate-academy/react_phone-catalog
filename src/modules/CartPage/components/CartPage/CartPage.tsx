/* eslint-disable @typescript-eslint/indent */
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartProduct } from '../CartProduct';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalPrice = () => {
    const pricesArr: number[] = [];

    cartItems.map(item => pricesArr.push(item.price * item.quantity));

    const price = pricesArr.reduce((acc, curr) => acc + curr, 0);

    return price;
  };

  const totalItemsCount = () => {
    const itemArr: number[] = [];

    cartItems.map(item => itemArr.push(item.quantity));

    return itemArr.reduce((acc, curr) => acc + curr, 0);
  };

  // eslint-disable-next-line no-console
  console.log(cartItems);

  return (
    <div className={styles.cart}>
      <button className={styles.cart__back} onClick={() => navigate(-1)}>
        <img src="./icons/ArrowLeft.svg" alt="back-arrow" />
        Back
      </button>
      <h2 className={styles.cart__title}>Cart</h2>
      <div className={styles.cart__container}>
        {cartItems.length === 0
          ? 'Your cart is empty'
          : cartItems.map(item => {
              return (
                <CartProduct
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  image={item.image}
                />
              );
            })}
      </div>

      <div className={styles.cart__checkout}>
        <div>
          <p className={styles.cart__price}>${totalPrice()}</p>
          <p className={styles['cart__item-count']}>
            Total for {totalItemsCount()} items
          </p>
        </div>
        <button>Checkout</button>
      </div>
    </div>
  );
};
