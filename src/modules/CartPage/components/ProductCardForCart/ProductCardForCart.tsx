import { FC } from 'react';
import styles from './ProductCardForCart.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { cartSlice } from '../../../../features/cart/cartSlice';

type Props = {
  title: string;
  img: string;
  currentPrice: number;
  productId: string;
};

export const ProductCardForCart: FC<Props> = ({
  title,
  img,
  currentPrice,
  productId,
}) => {
  const dispatch = useAppDispatch();

  const productInCart = useAppSelector(state =>
    state.cart.find(item => item.id === productId),
  );

  const count = productInCart ? productInCart.count : 1;
  const price = productInCart ? productInCart.price : currentPrice;

  return (
    <article className={styles.card__cart}>
      <div className={styles.card__content__cart}>
        <div className={styles.wrapper}>
          <button
            onClick={() => {
              dispatch(cartSlice.actions.removeProduct(productId));
            }}
            className={styles.delete__cart}
          >
            ✕
          </button>

          <Link to={`/product/${productId}`} className={styles.card__img__cart}>
            <img loading="lazy" src={img} alt="product image" />
          </Link>
          <Link to={`/product/${productId}`}>
            <h4 className={styles.card__title__cart}>{title}</h4>
          </Link>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.quantity}>
            <div
              onClick={() => {
                if (count > 1) {
                  dispatch(cartSlice.actions.minusCount(productId));
                }
              }}
              className={count === 1 ? styles.minus__disabled : styles.minus}
            >
              -
            </div>
            <div className={styles.count}>{count}</div>
            <div
              onClick={() => {
                dispatch(cartSlice.actions.plusCount(productId));
              }}
              className={styles.plus}
            >
              +
            </div>
          </div>

          <p className={styles.card__price__cart}>${Number(price) * count}</p>
        </div>
      </div>
    </article>
  );
};
