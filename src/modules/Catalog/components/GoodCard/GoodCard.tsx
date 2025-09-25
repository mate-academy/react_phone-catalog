import { useState } from 'react';
import { Product } from '../../interfaces/Product';
import styles from './GoodCard.module.scss';
import { Link } from 'react-router-dom';

interface PhoneCardProps {
  product: Product;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <article className={styles.card} data-qa="card">
      <div className={styles.card__top}>
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.card__image}
          />
        </Link>
      </div>

      <h2 className={styles.card__name}>
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      </h2>

      <div className={styles.card__prices}>
        <p className={styles.card__fullPrice}>${product.fullPrice}</p>
        <p className={styles.card__price}>${product.price}</p>
      </div>

      <p className={styles.card__settings}>
        <span className={styles['card__settings-name']}>Screen</span>
        <span className={styles['card__settings-value']}>{product.screen}</span>

        <span className={styles['card__settings-name']}>Capacity</span>
        <span className={styles['card__settings-value']}>
          {product.capacity}
        </span>

        <span className={styles['card__settings-name']}>RAM</span>
        <span className={styles['card__settings-value']}>{product.ram}</span>
      </p>

      <div className={styles.card__buttons}>
        <a href="#buy" className={styles['card__buttons-cart']} data-qa="hover">
          Add to cart
        </a>

        <a
          href="#"
          className={styles['card__buttons-fav']}
          onClick={e => {
            e.preventDefault();
            toggleFavorite();
          }}
        >
          <img
            src={
              isFavorite ? '/img/icons/fav-active.png' : '/img/icons/fav.png'
            }
            alt="favourite goods"
          />
        </a>
      </div>
    </article>
  );
};
