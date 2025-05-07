import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import styles from './CartPage.module.scss';
import { useSelector } from 'react-redux';

import { Product } from '../../types/product';
import { RootState } from '../../store';
import CartItem from '../../components/CartItem/CartItem';
import notFoundImage from '../../../public/img/product-not-found.png';

const CartPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState<Product[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const cartProducts = useSelector((state: RootState) => state.cartProducts);

  useEffect(() => {
    const calculatedTotal = cartProducts.reduce((acc, item) => {
      if (item.quantity !== undefined) {
        return acc + item.priceRegular * item.quantity;
      } else {
        return acc;
      }
    }, 0);

    setTotalPrice(calculatedTotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts.map(item => item.quantity).join(','), cartProducts]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart') || '[]';
    const parsedCart = JSON.parse(storedCart);

    if (storedCart) {
      try {
        const calculatedTotal = parsedCart.reduce(
          (acc: number, item: Product) => {
            if (item.quantity !== undefined) {
              return acc + item.quantity;
            } else {
              return acc;
            }
          },
          0,
        );

        setCart(parsedCart);
        setTotalQuantity(calculatedTotal);
      } catch (e) {}
    }
  }, [cartProducts]);

  if (!cart.length) {
    return (
      <div className={styles.cartPage}>
        <Breadcrumb type="cart" />
        <h1 className={styles.cartPage__title}>Cart</h1>
        <img
          className={styles.cartPage__notFoundImg}
          src={notFoundImage}
          alt=""
        />
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.cartPage}>
          <Breadcrumb type="cart" />
          <h1 className={styles.cartPage__title}>Cart</h1>
        </div>
        <div className={styles.cartPage__content}>
          <div className={styles.cartPage__items}>
            {cart.map(item => {
              return <CartItem key={item.id} product={item} />;
            })}
          </div>
          <div className={styles.cartPage__total}>
            <h2 className={styles.cartPage__price}>${totalPrice}</h2>
            <p
              className={styles.cartPage__text}
            >{`Total for ${totalQuantity} items`}</p>
            <div className={styles.cartPage__separator}></div>
            <button
              className={`${styles.cartPage__button} ${styles.cartPage__add}`}
            >
              Checkout
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default CartPage;
