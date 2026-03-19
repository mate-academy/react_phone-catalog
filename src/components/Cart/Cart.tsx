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

  const total = cart.reduce((sum, id) => {
    const product = productsMap[id];
    const count = counts[id] || 1;

    if (!product) {
      return sum;
    }

    return sum + product.fullPrice * count;
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
      cart.forEach(id => deletCard(id));
    }
  };

  return (
    <div className={styles.box}>
      <NavigateBar />
      <h1 className={styles.title}>{t('cart')}</h1>
      <div className={styles.productlist}>
        <div className={styles.boxlist}>
          {cart.map(item => {
            const product = productsMap[item];
            const score = counts[item] || 1;

            if (!product) {
              return null;
            }

            return (
              <div key={item} className={styles.productItem}>
                <button
                  className={styles.delet}
                  onClick={() => deletCard(product.itemId)}
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
                  <button className={styles.add} onClick={() => increase(item)}>
                    <img src="./img/icons/Plus.svg" alt="Plus" />
                  </button>
                  <p className={styles.howmuch}>{score}</p>
                  <button className={styles.add} onClick={() => decrease(item)}>
                    <img src="./img/icons/Minus.svg" alt="Minus" />
                  </button>
                </div>
                <p className={styles.pryce}>${product.fullPrice}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.forbuy}>
          <p className={styles.total}>
            {t('total')}: ${total}
          </p>
          <p className={styles.howitms}>
            {t('otalfor')} {cart.length} {t('items')}
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
