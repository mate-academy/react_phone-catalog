import React, { useEffect, useState } from 'react';
import styles from './CartPage.module.scss';
import { useAppContext } from '../../contexts/AppContext';
import { CartProduct } from './CartProduct';
import { ModalWindow } from './ModalWindow';

export const CartPage: React.FC = () => {
  const { cartProductsIds, products, isLoading } = useAppContext();

  function countTotal() {
    let sum = 0;
    for (const id of cartProductsIds) {
      const product = products.find(product => product.id === id);
      if (product) {
        sum += product.price;
      }
    }
    return sum;
  }

  const [totalSum, setTotalSum] = useState(countTotal());
  const [totalItems, setTotalItems] = useState(cartProductsIds.length);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleProductCountChange(price: number, action: '+' | '-') {
    if (action === '+') {
      setTotalSum(prevPromise => {
        const prev = prevPromise;
        return prev + price;
      });
      setTotalItems(prev => prev + 1);
      return;
    }

    setTotalSum(prevPromise => {
      const prev = prevPromise;
      return prev - price;
    });
    setTotalItems(prev => prev - 1);
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  useEffect(() => {
    setTotalSum(countTotal());
    setTotalItems(cartProductsIds.length);
  }, [isLoading, cartProductsIds]);

  return (
    <main
      className={`
        ${styles.main} 
        ${isModalOpen ? styles.isModalOpen : ''}
      `}
    >
      {cartProductsIds.length > 0 && (
        <>
          <h1 className={styles.title}>Cart</h1>

          <div className={styles.content}>
            <div className={styles.products}>
              {cartProductsIds.map(id => (
                <CartProduct
                  key={id}
                  product={
                    products.find(product => product.id === id)
                  }
                  onProductCountChange={handleProductCountChange}
                />
              ))}
            </div>

            <div className={styles.checkout}>
              <div className={styles.checkoutContent}>
                <h2 className={styles.price}>${totalSum}</h2>
                <span
                  className={`${styles.total} bodyText`}
                >Total for {totalItems} items</span>
              </div>

              <div className={styles.line}></div>

              <button
                onClick={() => setIsModalOpen(true)}
                className={`${styles.button} buttonText`}
              >Checkout</button>
            </div>
          </div>
        </>
      )}

      <div
        className={styles.overlay}
        style={{ display: isModalOpen ? 'block' : 'none' }}
        onClick={() => setIsModalOpen(false)}
      ></div>

      <ModalWindow
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />


      {cartProductsIds.length === 0 && (
        <img className={styles.emptyCart} src="/img/cart-is-empty.png" alt="Cart is empty" />
      )}
    </main>
  );
};
