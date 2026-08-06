import React, { useEffect, useState, useCallback } from 'react';
import styles from './CartPage.module.scss';
import { useAppState } from '../../Context/AppContext';
import { CartProduct } from './CartProduct';
import { ModalWindow } from './ModalWindow';
import { Back } from '../../components/Back';
import { getTranslation } from '../Base/utils/getTranslation';
import { getCartProductsCount } from '../Base/utils/getCartProductsCount';

export const CartPage: React.FC = () => {
  const { cartProducts, products, isLoadingProducts, language } = useAppState();
  const t = getTranslation(language);

  const countTotal = useCallback(() => {
    let sum = 0;

    for (const id in cartProducts) {
      const foundProduct = products.find(item => item.itemId === id);

      if (foundProduct) {
        sum += foundProduct.price * cartProducts[id];
      }
    }

    return sum;
  }, [cartProducts, products]);

  const [totalSum, setTotalSum] = useState(countTotal());
  const [totalItems, setTotalItems] = useState(
    getCartProductsCount(cartProducts),
  );
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
    setTotalItems(getCartProductsCount(cartProducts));
    setTotalSum(countTotal());
  }, [isLoadingProducts, cartProducts, countTotal]);

  return Object.keys(cartProducts).length > 0 ? (
    <main
      className={`
        ${styles.main}
        ${isModalOpen ? styles.isModalOpen : ''}
      `}
    >
      <Back />

      <h2 className={styles.title}>{t.cartPage.title}</h2>

      <div className={styles.content}>
        <div className={styles.products}>
          {Object.keys(cartProducts).map(id => (
            <CartProduct
              key={id}
              product={products.find(item => item.itemId === id)}
              onProductCountChange={handleProductCountChange}
            />
          ))}
        </div>

        <div className={styles.checkout}>
          <div className={styles.checkoutContent}>
            <h3 className={styles.price}>${totalSum}</h3>
            <span className={`${styles.total} bodyText`}>
              {t.cartPage.totalFor} {totalItems}{' '}
              {totalItems === 1
                ? t.cartPage.item
                : totalItems >= 2 && totalItems <= 4
                  ? t.cartPage.items_2_4
                  : t.cartPage.items}
            </span>
          </div>

          <div className={styles.line}></div>

          <button
            onClick={() => setIsModalOpen(true)}
            className={`${styles.button} buttonText`}
          >
            {t.cartPage.checkout}
          </button>
        </div>
      </div>

      <div
        className={styles.overlay}
        style={{ display: isModalOpen ? 'block' : 'none' }}
        onClick={() => setIsModalOpen(false)}
      ></div>

      <ModalWindow isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  ) : (
    <main className={styles.main}>
      <img
        className={styles.emptyCart}
        src="./img/cart-is-empty.png"
        alt={t.cartPage.cartIsEmpty}
      />
    </main>
  );
};
