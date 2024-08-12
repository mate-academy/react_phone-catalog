import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Store/Store';
import styles from './Cart.module.scss';
import { CardCart } from '../Cards/Cart-Card';
import { CartsProducts } from '../../type/Carts';
import { BackButton } from '../../Functions/BackButton';

export const Cart = () => {
  const { carts, setCarts } = useContext(Context);
  const [totalCount, setTotalSum] = useState(0);

  const handleCountChange = (item: CartsProducts) => {
    const updatedCarts = carts.map(cartItem => {
      if (cartItem.id === item.id) {
        return item;
      } else {
        return cartItem;
      }
    });

    setCarts(updatedCarts);
  };

  const handelDelete = (item: CartsProducts) => {
    const inCartIndex = carts.findIndex(cart => cart.id === item.id);

    if (inCartIndex !== -1) {
      const updatedCarts = [...carts];

      updatedCarts.splice(inCartIndex, 1);
      setCarts(updatedCarts);
      localStorage.setItem('carts', JSON.stringify(updatedCarts));
    }
  };

  useEffect(() => {
    const total = carts.reduce((acc, cur) => {
      return acc + cur.count * cur.fullPrice;
    }, 0);

    setTotalSum(total);
  }, [carts]);

  const allItems = () => {
    const allItem = carts.reduce((acc, crr) => {
      return acc + crr.count;
    }, 0);

    return allItem;
  };

  return (
    <div>
      <div className={styles.title}>
        <BackButton />
        <h1>Cart</h1>
      </div>
      {carts.length !== 0 ? (
        <div className={styles.content}>
          <div className={styles.items}>
            {carts.map(cart => (
              <CardCart
                key={cart.id}
                item={cart}
                onCountChange={handleCountChange}
                onDelete={handelDelete}
              />
            ))}
          </div>
          <div className={styles.total}>
            <div className={styles.totalSum}>
              <h1>{`$${totalCount}`}</h1>
            </div>
            <div className="cart-total_items">
              <p>{`Total for ${allItems()} items`}</p>
            </div>
            <div className={styles.totalButton}>
              <button className={styles.totalCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <h1>Your cart is empty</h1>
        </div>
      )}
    </div>
  );
};
