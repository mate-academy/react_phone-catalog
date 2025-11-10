import { useEffect, useState } from 'react';
import { useCart } from '../../ProductsContext/CartContext';
import { useTabs } from '../../ProductsContext/TabsContext';
import styles from './Cart.module.scss';
import { CommonButton } from './components/CommonButton';
import { CountBox } from './components/CountBox';
import { TotalPrice } from './components/TotalPrice';
import { CartIsEmpty } from './components/CartIsEmpty';
import { useOpenProduct } from '../shared/hooks/useOpenProduct';

export const Cart = () => {
  const { productsList } = useTabs();
  const { cartItems } = useCart();
  const [countItems, setCountItems] = useState<Record<number, number>>({});
  const { openProduct } = useOpenProduct();

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
        {cartProducts.length === 0 ? (
          <CartIsEmpty />
        ) : (
          cartProducts.map(element => {
            const count = countItems[element.id] || 1;

            return (
              <div className={styles.cartComponent} key={element.id}>
                <div className={styles.box}>
                  <CommonButton
                    setCountItems={setCountItems}
                    element={element}
                  />

                  <img
                    className={styles.picture}
                    src={element.image}
                    alt="Picture"
                    onClick={() => openProduct(element.category, element.id)}

                  />

                  <div
                    className={styles.title}
                    onClick={() => openProduct(element.category, element.id)}
                  >
                    {element.name}
                  </div>
                </div>

                <div className={styles.box}>
                  <CountBox
                    count={count}
                    removeItemfromCart={removeItemfromCart}
                    addItemInCart={addItemInCart}
                    element={element}
                  />

                  <div className={styles.price}>${element.price * count}</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <TotalPrice commonPrice={commonPrice} totalItems={totalItems} />
    </div>
  );
};
