import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './ProductCard.module.scss';
import { useState } from 'react';

interface Props {
  name: string;
  image: string;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
}

export const ProductCard = ({
  name,
  image,
  price,
  screen,
  capacity,
  ram,
}: Props) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleToggleCart = () => {
    setIsAdded(prev => !prev);
  };

  const handleToggleFavourite = () => {
    setIsFavourite(prev => !prev);
  };

  return (
    <article className={styles.card}>
      <Link to="/product/123" className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <img src={`/${image}`} alt={name} className={styles.image} />
        </div>
      </Link>

      <h3 className={styles.title}>{name}</h3>
      <p className={styles.price}>${price}</p>

      <div className={styles.specs}>
        <div>
          <span>Screen</span>
          <span>{screen}</span>
        </div>
        <div>
          <span>Capacity</span>
          <span>{capacity}</span>
        </div>
        <div>
          <span>RAM</span>
          <span>{ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.cartButton} ${
            isAdded ? styles.cartButtonAdded : ''
          }`}
          onClick={handleToggleCart}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.favouriteButton} ${
            isFavourite ? styles.favouriteButtonActive : ''
          }`}
          aria-label="Add to favourites"
          onClick={handleToggleFavourite}
        >
          <Icon
            name={isFavourite ? 'heart-like' : 'heart'}
            className={styles.favouriteIcon}
          />
        </button>
      </div>
    </article>
  );
};
