import React, { useContext } from 'react';

import styles from './CartCard.module.scss';
import { Product } from '../../../../types/Product';
import classNames from 'classnames';
import { DispatchContext } from '../../../../Store';

type Props = {
  product: Product;
};

export const CartCard: React.FC<Props> = ({ product }) => {
  const { image, name, id, amount, totalPrice } = product;

  const dispatch = useContext(DispatchContext);

  const prevHandlerMinus = () => {
    dispatch({ type: 'minusOneItem', id });
  };

  const prevHandlerPlus = () => {
    dispatch({ type: 'plusOneItem', id });
  };

  const handleOnDelete = () => {
    dispatch({ type: 'removeFromCart', id });
  };

  return (
    <article className={styles.card}>
      <div className={styles.card__product}>
        <button className={styles.card__delete} onClick={handleOnDelete} />
        <div
          className={styles.card__image}
          style={{ backgroundImage: `url(${image})` }}
        />
        <span className={styles.card__name}>{name}</span>
      </div>

      <div className={styles.card__info}>
        <div className={styles.card__count}>
          <button
            className={classNames(
              styles.card__button,
              styles['card__button-minus'],
            )}
            disabled={amount <= 1}
            onClick={prevHandlerMinus}
          />
          <span className={styles.card__num}>{amount}</span>
          <button
            className={classNames(
              styles.card__button,
              styles['card__button-plus'],
            )}
            onClick={prevHandlerPlus}
          />
        </div>
        <span className={styles.card__price}>${totalPrice}</span>
      </div>
    </article>
  );
};
