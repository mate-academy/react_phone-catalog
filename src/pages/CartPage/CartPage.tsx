import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../Store';

import { Button } from '../../components/Button';
import { CartItem } from '../../components/CartItem';
import { GoToBack } from '../../components/GoToBack';
import { numberToCurrency } from '../../utils/numberToCurrency';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const cartProducts = useProducts(state => state.cartProducts);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [totlaItems, setTotlaItems] = useState(0);
  const [isOrder, setIsOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const productCount: { [key: string]: number } = {};

    cartProducts.forEach(prod => {
      productCount[prod.id] = +(localStorage.getItem(prod.id) || 1);
    });

    const arrProductCount = Object.values(productCount);
    const sumProductCount = arrProductCount.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    setTotlaItems(sumProductCount);
  }, [cartTotalPrice]);

  return (
    <>
      <GoToBack />
      <h1>Cart</h1>
      {isOrder && (
        <div className={styles.order}>
          <h2>We are sorry, but this feature is not implemented yet</h2>
          <Button text="Go to Home" onClick={() => navigate('/')} />
        </div>
      )}
      {cartProducts.length > 0 && !isOrder && (
        <div className={styles.cart}>
          <div className={styles.cartItems}>
            {cartProducts.map(prod => (
              <CartItem
                key={prod.id}
                product={prod}
                setCartTotalPrice={setCartTotalPrice}
              />
            ))}
          </div>
          <div className={styles.cartTotal}>
            <h1>{numberToCurrency(cartTotalPrice)}</h1>
            <p className={`bodyText ${styles.cartTotalCount}`}>{`Total for ${totlaItems} items`}</p>
            <hr />

            <Button
              text="Checkout"
              className={styles.cartTotalBtn}
              onClick={() => setIsOrder(true)}
            />
          </div>
        </div>
      )}
      {cartProducts.length === 0 && (
        <h2>Your cart is empty</h2>
      )}
    </>
  );
};
