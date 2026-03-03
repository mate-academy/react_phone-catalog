import { FC, SetStateAction } from 'react';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { Favorite } from '../Favorite';
import { AddToCart } from '../AddToCart';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { cartSlice } from '../../../../features/cart/cartSlice';

type Props = {
  title: string;
  fullPrice: number;
  descScreen: string;
  descCapacity: string;
  descRAM: string;
  img: string;
  currentPrice: number;
  type?: 'hot' | 'new';
  productId?: string;
  cart: boolean;
  pathName: string;
};

export const ProductCard: FC<Props> = ({
  title,
  fullPrice,
  descScreen,
  descCapacity,
  descRAM,
  img,
  currentPrice,
  type,
  productId,
  cart,
  pathName,
}) => {
  const dispatch = useAppDispatch();

  const productInCart = useAppSelector(state =>
    state.cart.find(item => item.id === productId),
  );

  const count = productInCart ? productInCart.count : 1;
  const price = productInCart ? productInCart.price : currentPrice;

  return (
    <article className={cart ? styles.card__cart : styles.card}>
      <div className={cart ? styles.card__content__cart : styles.card__content}>
        {cart && (
          <button
            onClick={() => {
              dispatch(cartSlice.actions.removeProduct(productId));
            }}
            className={styles.delete__cart}
          >
            ✕
          </button>
        )}
        <Link
          to={`/product/${productId}`}
          state={{ from: pathName }}
          className={cart ? styles.card__img__cart : styles.card__img}
        >
          <img loading="lazy" src={img} alt="product image" />
        </Link>
        <Link to={`/product/${productId}`}>
          <h4 className={cart ? styles.card__title__cart : styles.card__title}>
            {title}
          </h4>
        </Link>
        {cart && (
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
        )}

        {cart && (
          <p className={cart ? styles.card__price__cart : styles.card__price}>
            ${Number(price) * count}
          </p>
        )}
        {!cart &&
          (type === 'new' ? (
            <p className={styles.card__price}>${fullPrice}</p>
          ) : (
            <div className={styles.prices}>
              <p className={styles.card__price}>${currentPrice}</p>
              <p className={styles.card__oldPrice}>${fullPrice}</p>
            </div>
          ))}

        {!cart && (
          <>
            <span className={styles.card__line}></span>
            <div className={styles.card__desc}>
              <div className={styles.desc}>
                <h6 className={styles.desc__name}>Screen</h6>
                <p className={styles.desc__text}>{descScreen}</p>
              </div>
              <div className={styles.desc}>
                <h6 className={styles.desc__name}>Capacity</h6>
                <p className={styles.desc__text}>{descCapacity}</p>
              </div>
              <div className={styles.desc}>
                <h6 className={styles.desc__name}>RAM</h6>
                <p className={styles.desc__text}>{descRAM}</p>
              </div>
            </div>
            <div className={styles.card__actions}>
              <AddToCart productId={productId} />
              <Favorite productId={productId} />
            </div>
          </>
        )}
      </div>
    </article>
  );
};
