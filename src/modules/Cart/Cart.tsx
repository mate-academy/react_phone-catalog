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

  return (
    <div className={styles.container}>
      {cartProducts.map(element => {
        const count = countItems[element.id] || 1;

        return (
          <div className={styles.cartComponent} key={element.id}>
            <div className={styles.box}>
              <button
                className={styles.commonButton}
                onClick={() => toggleCart(element.id)}
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
  );
};
