import { useContext, useMemo, useState } from 'react';
import classNames from 'classnames';

import { ProductsContext } from '../../store/ProductsProvider';
import { BackButton } from '../shared/BackButton';
import { Price } from '../shared/Price';

import { Card } from './components/Card';
import { Modal } from './components/Modal';

import styles from './CartPage.module.scss';
import { ThemeContext } from '../../store/ThemeProvider';

export const CartPage = () => {
  const { isThemeDark } = useContext(ThemeContext);
  const { addedProducts, setAddedProducts } = useContext(ProductsContext);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const total = useMemo(
    () =>
      addedProducts.reduce(
        (currTotal, pr) => {
          const newPrice = currTotal.price + pr.count * pr.price;
          const newCount = currTotal.count + pr.count;

          return {
            price: newPrice,
            count: newCount,
          };
        },
        { count: 0, price: 0 },
      ),
    [addedProducts],
  );

  const handleChangeCount = (productId: string, newCount: number) => {
    const newAddedProducts = addedProducts.map(pr => {
      if (pr.id === productId) {
        return {
          ...pr,
          count: newCount,
        };
      }

      return pr;
    });

    setAddedProducts(newAddedProducts);
  };

  const handleRemoveProduct = (productId: string) => {
    const newAddedProducts = addedProducts.filter(pr => pr.id !== productId);

    setAddedProducts(newAddedProducts);
  };

  const handleClearCart = () => {
    setAddedProducts([]);
    setIsModalOpened(false);
  };

  return (
    <div className={styles.CartPage}>
      <div
        className={classNames(styles.CartPage__content, {
          [styles.CartPage__content_withModal]: isModalOpened,
        })}
      >
        <BackButton />

        <h1 className={styles.CartPage__title}>Cart</h1>

        {addedProducts.length === 0 ? (
          <div className={styles.CartPage__imgEmpty}></div>
        ) : (
          <div className={styles.CartPage__body}>
            <ul className={styles.CartPage__list}>
              {addedProducts.map(product => (
                <Card
                  key={product.id}
                  product={product}
                  onChangeCount={newCount =>
                    handleChangeCount(product.id, newCount)
                  }
                  onRemoveProduct={() => handleRemoveProduct(product.id)}
                />
              ))}
            </ul>

            <div
              className={classNames(styles.CartPage__total, {
                [styles.CartPage__total_darkTheme]: isThemeDark,
              })}
            >
              <Price
                price={total.price}
                otherClass={styles.CartPage__totalPrice}
                isBigTextSize={true}
              />

              <p
                className={classNames(styles.CartPage__totalCount, {
                  [styles.CartPage__totalCount_darkTheme]: isThemeDark,
                })}
              >
                Total for {total.count} items
              </p>

              <button
                className={classNames(styles.CartPage__chekout, {
                  [styles.CartPage__chekout_darkTheme]: isThemeDark,
                })}
                onClick={() => setIsModalOpened(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpened && (
        <Modal
          onClose={() => setIsModalOpened(false)}
          onClearCast={handleClearCart}
        />
      )}
    </div>
  );
};
