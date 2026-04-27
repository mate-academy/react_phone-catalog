import styles from './Cart.module.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { useProducts } from '../../hooks/useProducts';
import { NavigateBar } from '../NavigateBar';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { cart, counts, total, totalItems, increase, decrease, deletCard } =
    useContext(ProductsContext);
  const { products } = useProducts();
  const { t } = useTranslation();

  const productsMap = Object.fromEntries(
    products.map(product => [product.itemId, product]),
  );

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
              <Link
                key={item.id}
                className={styles.productItem}
                to={`/${product.category}/${product.itemId}`}
              >
                <button
                  className={styles.delet}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    deletCard(item.id);
                  }}
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
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      increase(item.id);
                    }}
                  >
                    <img src="./img/icons/Plus.svg" alt="Plus" />
                  </button>

                  <p className={styles.howmuch}>{score}</p>

                  <button
                    className={styles.add}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      decrease(item.id);
                    }}
                  >
                    <img src="./img/icons/Minus.svg" alt="Minus" />
                  </button>
                </div>

                <p className={styles.pryce}>${cartprice}</p>
              </Link>
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
