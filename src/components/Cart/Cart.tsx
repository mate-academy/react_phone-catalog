import styles from './Cart.module.scss';
import { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { useProducts } from '../../hooks/useProducts';
import { NavigateBar } from '../NavigateBar';
import { useTranslation } from 'react-i18next';

export const Cart = () => {
  const { cart, deletCard } = useContext(ProductsContext);
  const { products } = useProducts();
  const { t } = useTranslation();

  const [counts, setCounts] = useState<Record<string, number>>(() => {
    try {
      const savedCounts = localStorage.getItem('counts');

      return savedCounts ? JSON.parse(savedCounts) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('counts', JSON.stringify(counts));
  }, [counts]);

  const productsMap = Object.fromEntries(
    products.map(product => [product.itemId, product]),
  );

  const total = cart.reduce((sum, item) => {
    const product = productsMap[item.id];
    const count = counts[item.id] || 1;

    if (!product) {
      return sum;
    }

    return sum + product.fullPrice * count;
  }, 0);

  const totalItems = cart.reduce((sum, item) => {
    return sum + (counts[item.id] || 1);
  }, 0);

  const increase = (id: string) => {
    setCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrease = (id: string) => {
    setCounts(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const handleCheckout = () => {
    const confirmed = window.confirm(t('check'));

    if (confirmed) {
      cart.forEach(item => deletCard(item.id));
    }
  };

  return (
    <div className={styles.box}>
      <NavigateBar />
      <h1 className={styles.title}>{t('cart')}</h1>

      <div className={styles.productlist}>
        <div className={styles.boxlist}>
          {cart.map(item => {
            const product = productsMap[item.id];

            if (!product) {
              return null;
            }

            const score = counts[item.id] || 1;
            const cartprice = score * product.fullPrice;

            return (
              <div key={item.id} className={styles.productItem}>
                <button
                  className={styles.delet}
                  onClick={() => deletCard(item.id)}
                >
                  <img src="./img/icons/clouse.svg" alt="Close" />
                </button>

                <div className={styles.boximg}>
                  <img
                    src={`./${product.image}`}
                    alt="Img"
                    className={styles.img}
                  />
                </div>

                <p className={styles.text}>{product.name}</p>

                <div className={styles.count}>
                  <button
                    className={styles.add}
                    onClick={() => increase(item.id)}
                  >
                    <img src="./img/icons/Plus.svg" alt="Plus" />
                  </button>

                  <p className={styles.howmuch}>{score}</p>

                  <button
                    className={styles.add}
                    onClick={() => decrease(item.id)}
                  >
                    <img src="./img/icons/Minus.svg" alt="Minus" />
                  </button>
                </div>

                <p className={styles.pryce}>${cartprice}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.forbuy}>
          <p className={styles.total}>
            {t('total')}: ${total}
          </p>

          <p className={styles.howitms}>
            {t('otalfor')} {totalItems} {t('items')}
          </p>

          <div className={styles.line}></div>

          <button className={styles.checkout} onClick={handleCheckout}>
            {t('checkout')}
          </button>
        </div>
      </div>
    </div>
  );
};
