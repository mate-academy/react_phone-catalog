import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../../providers/CartProvider';
import { CartItem } from '../../../../providers/CartReducer';
import styles from './ShoppingCard.module.scss';

type Props = {
  item: CartItem;
};

export const ShoppingCard: React.FC<Props> = ({ item }) => {
  const context = useContext(CartContext);

  if (!context) {
    return null;
  }

  const { dispatch } = context;

  const increace = () => {
    dispatch({ type: 'Increase', id: item.product.id });
  };

  const decreace = () => {
    dispatch({ type: 'Decrease', id: item.product.id });
  };

  const remove = () => {
    dispatch({ type: 'Remove', id: item.product.id });
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__left}>
        <button className={styles.card__delete} onClick={remove} />
        <img
          className={styles.card__image}
          src={`/${item.product.images[0]}`}
          alt={item.product.name}
        />
        <Link to={`/${item.product.category}/${item.product.id}`}>
          <p className={styles.card__title}>{item.product.name}</p>
        </Link>
      </div>

      <div className={styles.card__right}>
        <div className={styles.card__quantity}>
          <button className={styles.card__button} onClick={decreace}>
            -
          </button>

          <span className={styles.card__value}>{item.quantity}</span>

          <button className={styles.card__button} onClick={increace}>
            +
          </button>
        </div>

        <p className={styles.card__price}>${item.product.priceRegular}</p>
      </div>
    </div>
  );
};
