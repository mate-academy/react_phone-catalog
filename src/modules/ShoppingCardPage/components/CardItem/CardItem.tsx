/* eslint-disable react/display-name */
import { FC, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Cart } from '../../../../types/Cart';
import { useGlobalState } from '../../../../context/store';
import styles from './CardItem.module.scss';

type Props = {
  cardItem: Cart;
};

export const CardItem: FC<Props> = memo(({ cardItem }) => {
  //#region state & handlers
  const { setCart } = useGlobalState();

  const removeItem = useCallback((selectedItemId: string) => {
    setCart(prevCard => prevCard.filter(item => item.id !== selectedItemId));
  }, []);

  const updateQuantity = useCallback(
    (selectedItemId: string, newQuantity: number) => {
      setCart(prevCard =>
        prevCard.map(item =>
          item.id === selectedItemId && item.quantity > 0
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    },
    [],
  );
  //#endregion

  return (
    <li className={styles.item}>
      <div className={styles.itemPart1}>
        <button
          onClick={() => removeItem(cardItem.id)}
          className={styles.itemBtnRemove}
        >
          <span className={styles.itemIconRemove}></span>
        </button>

        <Link
          to={`/${cardItem.product.category}/${cardItem.product.itemId}`}
          className={styles.itemLink}
        >
          <div className={styles.imgWrapper}>
            <img
              src={cardItem.product.image}
              alt={`product image ${cardItem.product.name}`}
              className={styles.itemImg}
            />
          </div>

          <div className={styles.itemName}>{cardItem.product.name}</div>
        </Link>
      </div>

      <div className={styles.itemPart2}>
        <div className={styles.itemCounter}>
          <button
            onClick={() => updateQuantity(cardItem.id, cardItem.quantity - 1)}
            className={styles.itemCounterBtn}
            disabled={cardItem.quantity === 1}
          >
            <span
              className={`${styles.itemCounterIcon} ${styles.itemCounterIconMinus}`}
            ></span>
          </button>

          <span className={styles.itemCounterValue}>{cardItem.quantity}</span>

          <button
            onClick={() => updateQuantity(cardItem.id, cardItem.quantity + 1)}
            className={styles.itemCounterBtn}
          >
            <span
              className={`${styles.itemCounterIcon} ${styles.itemCounterIconPlus}`}
            ></span>
          </button>
        </div>

        <div className={styles.itemPrice}>{`$${cardItem.product.price}`}</div>
      </div>
    </li>
  );
});
