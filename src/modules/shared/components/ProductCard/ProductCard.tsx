import { FC } from 'react';
import styles from './ProductCard.module.scss';
import favourites from './../../../../../public/img/favourites.svg';

type Props = {
  title: string;
  fullPrice: number;
  descScreen: string;
  descCapacity: string;
  descRAM: string;
  img: string;
  currentPrice: number;
  type: 'hot' | 'new';
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
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.card__content}>
        <div className={styles.card__img}>
          <img src={img} alt="product image" />
        </div>
        <h4 className={styles.card__title}>{title}</h4>
        {type === 'new' ? (
          <p className={styles.card__price}>${fullPrice}</p>
        ) : (
          <div className={styles.prices}>
            <p className={styles.card__price}>${currentPrice}</p>
            <p className={styles.card__oldPrice}>${fullPrice}</p>
          </div>
        )}

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
          <button className={styles.cart}>Add to cart</button>
          <button className={styles.card__favourites}>
            <span className={styles.favourites__img}></span>
          </button>
        </div>
      </div>
    </article>
  );
};
