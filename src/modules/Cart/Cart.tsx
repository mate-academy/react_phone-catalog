import { useEffect, useState } from 'react';
import { useCart } from '../../ProductsContext/CartContext';
import { useTabs } from '../../ProductsContext/TabsContext';
import styles from './Cart.module.scss';

export const Cart = () => {
  const { productsList } = useTabs();
  const { cartItems, toggleCart } = useCart();
  const [countItems, setCountItems] = useState<Record<number, number>>({});

  const addItemInCart = (id: number) => {
    setCountItems(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const removeItemfromCart = (id: number) => {
    setCountItems(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const cartProducts = productsList.filter(product =>
    cartItems.includes(product.id),
  );

  useEffect(() => {
    const saved = localStorage.getItem('cartCounts');

    if (saved) {
      setCountItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartCounts', JSON.stringify(countItems));
  }, [countItems]);

  const commonPrice = cartProducts.reduce((sum, product) => {
    const count = countItems[product.id] || 1;

    return sum + count * product.price;
  }, 0);

  const totalItems = cartProducts.reduce((sum, product) => {
    const count = countItems[product.id] || 1;

    return sum + count;
  }, 0);

  return (
    <div className={styles.container}>
      <div className={styles.cartContainer}>
        {cartProducts.map(element => {
          const count = countItems[element.id] || 1;

          return (
            <div className={styles.cartComponent} key={element.id}>
              <div className={styles.box}>
                <button
                  className={styles.commonButton}
                  onClick={() => {
                    toggleCart(element.id);
                    setCountItems(prev => {
                      const updated = { ...prev };

                      delete updated[element.id];

                      return updated;
                    });
                  }}
                >
                  <img src="/img/SliderImg/Union.svg" alt="Union" />
                </button>

                <img
                  className={styles.picture}
                  src={element.image}
                  alt="Picture"
                />

                <div className={styles.title}>{element.name}</div>
              </div>

              <div className={styles.box}>
                <div className={styles.countBox}>
                  <button
                    onClick={() => removeItemfromCart(element.id)}
                    className={`${styles.button} ${styles.commonButton} ${count > 1 ? styles.buttonActive : ''}`}
                  >
                    -
                  </button>
                  <div className={styles.commonButton}>{count}</div>
                  <button
                    onClick={() => addItemInCart(element.id)}
                    className={`${styles.button} ${styles.commonButton} ${styles.buttonActive}`}
                  >
                    +
                  </button>
                </div>

                <div className={styles.price}>${element.price * count}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.gridPrice}>
        <div className={styles.containerPrice}>
          <div className={styles.containerTotalPrice}>
            <div className={styles.totalPrice}>${commonPrice}</div>
            <div className={styles.countItems}>
              Total for {totalItems} items
            </div>
          </div>
          <button className={styles.checkout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};
