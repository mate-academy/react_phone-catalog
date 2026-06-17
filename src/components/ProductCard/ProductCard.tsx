import { useState } from 'react';
import styles from './ProductCard.module.scss';
import { asset } from '../../utils/paths';

type Props = {
  title: string;
  price: number;
  image?: string;
  screen: string;
  capacity: string;
  ram: string;
};

export const ProductCard: React.FC<Props> = ({
  title,
  price,
  image,
  screen,
  capacity,
  ram,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.image}>
          {image ? (
            <img src={asset(image)} alt={title} />
          ) : (
            <span>No image</span>
          )}
        </div>

        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.info}>
        <p className={styles.price}>${price}</p>

        <ul className={styles.specs}>
          <li className={styles.spec}>
            <span>Screen</span>
            <span>{screen}</span>
          </li>

          <li className={styles.spec}>
            <span>Capacity</span>
            <span>{capacity}</span>
          </li>

          <li className={styles.spec}>
            <span>RAM</span>
            <span>{ram}</span>
          </li>
        </ul>
      </div>

      <div className={styles.cardButtons}>
        <button className={styles.button}>Add to cart</button>

        <button
          type="button"
          aria-label="Add to favorites"
          onClick={() => setIsFavorite(prev => !prev)}
          className={`${styles.buttonAddFavorites} ${
            isFavorite ? styles.selected : ''
          }`}
        >
          <span
            className={`${styles.heart} ${
              isFavorite ? styles.heartSelected : ''
            }`}
          />
        </button>
      </div>
    </article>
  );
};
