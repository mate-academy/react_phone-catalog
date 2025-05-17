import { useContext, useEffect, useState } from 'react';
import { BackButton } from '../Product details page/components/Back button/BackButton';
import styles from './Cart.module.scss';
import { CartContext } from '../../context/CartContext';

import { EmptyCart } from './components/Empty/Empty';
import { useTranslation } from 'react-i18next';

export const CartPage = () => {
  const { t } = useTranslation();
  const { items, dispatch } = useContext(CartContext);
  const count = items.reduce((acc, item) => acc + Number(item.quantity), 0);
  const handleDeleteItem = id => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleChangeQuantity = (id, delta: number) => {
    dispatch({ type: 'CHANGE_QUANTITY', payload: { id, delta } });
  };

  const handleCheckout = () => {
    const shouldClear = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (shouldClear) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  const [sum, setSum] = useState(0);

  useEffect(() => {
    setSum(
      items.reduce(
        (acc, item) => acc + item.product.fullPrice * item.quantity,
        0,
      ),
    );
  }, [items]);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className={styles.CartPage}>
      <div className={styles.CartPage__header}>
        <BackButton />
        <h1 className={styles.CartPage__title}>{t('cart.title')}</h1>
      </div>
      <div className={styles.CartPage__main}>
        <ul className={styles.CartPage__items}>
          {items.map((item, index) => {
            return (
              <li className={styles.CartPage__item} key={index}>
                <div className={styles.CartPage__item__info}>
                  <img
                    src="./img/buttons/Icons/Close.svg"
                    alt="delete"
                    className={styles.CartPage__item__close}
                    onClick={() => handleDeleteItem(item.id)}
                  />

                  <img
                    src={item.product.image}
                    alt={item.product.itemId}
                    className={styles.CartPage__item__image}
                  />
                  <p className={styles.CartPage__item__title}>
                    {item.product.name}
                  </p>
                </div>
                <div className={styles.CartPage__item__price}>
                  <div className={styles.CartPage__item__controls}>
                    <button
                      className={styles.CartPage__item__button}
                      onClick={() => handleChangeQuantity(item.id, -1)}
                    >
                      <img
                        src="./img/buttons/Icons/Icons/Minus.svg"
                        alt=""
                        className={styles.CartPage__item__minus}
                      />
                    </button>
                    <p className={styles.CartPage__item__count}>
                      {item.quantity}
                    </p>
                    <button
                      className={styles.CartPage__item__button}
                      onClick={() => handleChangeQuantity(item.id, 1)}
                    >
                      <img
                        src="./img/buttons/Icons/Icons/Plus.svg"
                        alt=""
                        className={styles.CartPage__item__add}
                      />
                    </button>
                  </div>
                  <div className={styles.CartPage__item__totalPrice}>
                    {`$${item.product.fullPrice * Number(item.quantity)}`}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.CartPage__confirm}>
          <div className={styles.CartPage__confirm__total}>
            <div
              className={styles.CartPage__confirm__totalPrice}
            >{`$${sum}`}</div>
            <div className={styles.CartPage__confirm__totalPrice_sum}>
              {t('cart.total', { count: count })}
            </div>
          </div>
          <button
            className={styles.CartPage__confirm__button}
            onClick={handleCheckout}
          >
            {t('cart.checkout')}
          </button>
        </div>
      </div>
    </div>
  );
};
