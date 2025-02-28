import React, { useEffect, useMemo, useState } from 'react';
import styles from './Cart.module.scss';
import { DataNames } from '../../hooks/useProductsStorage';
import { getDataPublic } from '../../shared/functions/getDataPublic';
import { Article } from '../../shared/types/Article';
import classNames from 'classnames';
import { useStorage } from '../../context/StorageContext';
import { NavAdress } from '../../shared/NavAdress';
import { useTheme } from '../../context/PageTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { goToInfo } from '../../shared/functions/handleGoToInfo';

export const Cart: React.FC = () => {
  const { cartItems, removeProduct } = useStorage();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [products, setProducts] = useState<Article[] | null>(null);
  const [countProducts, setCountProducts] = useState<{ [key: string]: number }>(
    {},
  );
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    if (!products) {
      return 0;
    }

    return products.reduce(
      (acc, product: Article) =>
        acc + countProducts[product.itemId] * product.price,
      0,
    );
  }, [products, countProducts]);

  useEffect(() => {
    if (cartItems) {
      getDataPublic('products', 10).then((response: Article[]) => {
        const result = cartItems
          .map(item => response.find(el => el.itemId === item))
          .filter(Boolean) as Article[];

        setProducts(result.length > 0 ? result : null);

        const initialCount = result.reduce(
          (acc, item) => {
            /* eslint-disable no-param-reassign */
            acc[item.itemId] = 1;
            /* eslint-enable no-param-reassign */

            return acc;
          },
          {} as { [key: string]: number },
        );

        setCountProducts(initialCount);
      });
    } else {
      setProducts(null);
    }
  }, [cartItems]);

  function updateCount(id: string, change: number) {
    setCountProducts(prev => {
      const newCount = (prev[id] || 1) + change;

      return newCount > 0 ? { ...prev, [id]: newCount } : prev;
    });
  }

  return (
    <div className={styles.cart}>
      <NavAdress />
      <h1 className={styles.cart__title}>{t('crt_cart')}</h1>
      {cartItems && products ? (
        <div className={styles.cart__content}>
          <div className={styles.cart__products}>
            <AnimatePresence>
              {products.map((item: Article) => {
                return (
                  <motion.div
                    onClick={() =>
                      goToInfo(navigate, item.itemId, item.category)
                    }
                    initial={{ opacity: 0, x: '-80%' }}
                    animate={{ opacity: 1, x: '0' }}
                    exit={{ opacity: 0, x: '-80%' }}
                    key={item.id}
                    className={styles.cart__product}
                  >
                    <button
                      className={styles.cart__closeButton}
                      onClick={e => {
                        e.stopPropagation();
                        removeProduct(DataNames.cart, item.itemId);
                      }}
                    >
                      <img
                        src={
                          theme === 'light'
                            ? `${import.meta.env.BASE_URL}/img/icons/Union.svg`
                            : `${import.meta.env.BASE_URL}/img/icons/dark_close.svg`
                        }
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    </button>

                    <img
                      src={`${import.meta.env.BASE_URL}/${item.image}`}
                      alt="Product Image"
                      className={styles.cart__image}
                    />

                    <p className={styles.cart__name}>{item.name}</p>

                    <div className={styles.cart__count}>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          updateCount(item.itemId, -1);
                        }}
                        className={classNames(
                          styles.cart__button,
                          styles.cart__minus,
                        )}
                      >
                        <img
                          src={`${import.meta.env.BASE_URL}/img/icons/Minus.svg`}
                          alt="imge"
                          style={{
                            objectFit: 'contain',
                          }}
                        />
                      </button>

                      <p className={styles.cart__countValue}>
                        {countProducts[item.itemId]}
                      </p>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          updateCount(item.itemId, 1);
                        }}
                        className={classNames(
                          styles.cart__button,
                          styles.cart__plus,
                        )}
                      >
                        <img
                          src={`${import.meta.env.BASE_URL}/img/icons/Plus.svg`}
                          alt="imge"
                          style={{
                            objectFit: 'contain',
                          }}
                        />
                      </button>
                    </div>

                    <h3
                      className={styles.cart__price}
                    >{`$${countProducts[item.itemId] * item.price}`}</h3>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className={styles.cart__checkout}>
            <div className={styles.cart__total}>
              <h2 className={styles.cart__totalPrice}>{`$${totalPrice}`}</h2>
              <p
                className={styles.cart__totalTItle}
              >{`${t('crt_total')} ${products.length} ${t('crt_items')}`}</p>
            </div>

            <button className={styles.cart__buttonCheckout}>
              {t('crt_check')}
            </button>
          </div>
        </div>
      ) : (
        <img
          style={{
            objectFit: 'cover',
            maxWidth: '75%',
            maxHeight: '45vh',
            margin: 'auto',
          }}
          src={`${import.meta.env.BASE_URL}/img/cart-is-empty.png`}
          alt="your cart is empty"
        />
      )}
    </div>
  );
};
