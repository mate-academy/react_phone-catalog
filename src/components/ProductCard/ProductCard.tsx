import { useState } from 'react';
import styles from './ProductCard.module.scss';
// import './styles/global.scss';
import { asset } from '../../utils/paths';
import { NavLink } from 'react-router-dom';
// import { mapProductToUIProduct } from '../../utils/mapProductToUIProduct';
import { ProductCardItem } from '../../types/ProductCardItem';

type Props = ProductCardItem & {
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  discount,
  showDiscount,
  image,
  screen,
  capacity,
  ram,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <NavLink
          to={`/products/${id}`}
          className={`${styles.icon} ${styles.mobileAction}`}
        >
          <div className={styles.image}>
            {image ? (
              <img src={asset(image)} alt={name} />
            ) : (
              <span>No image</span>
            )}
          </div>

          <h3 className={styles.title}>{name}</h3>
        </NavLink>
      </div>
      <div className={styles.info}>
        <div className={styles.wrapperPrice}>
          <p className={styles.price}>${price}</p>
          {showDiscount && discount > 0 && (
            <p className={styles.discount}>${discount}</p>
          )}
        </div>

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
        <button className={styles.buttonAddToCart}>Add to cart</button>

        <button
          type="button"
          aria-label="Add to favorites"
          onClick={() => setIsFavorite(prev => !prev)}
          className={`${styles.buttonAddFavorites} ${
            isFavorite ? styles.selected : ''
          }`}
        >
          <span
            // className={`${styles.heart} ${
            //   isFavorite ? styles.heartSelected : ''
            // }`}
            className={styles.heart}
            style={{
              backgroundImage: `url(${asset(
                isFavorite
                  ? 'img/icons/heart-filled.svg'
                  : 'img/icons/heart.svg',
              )})`,
            }}
          />
        </button>
      </div>
    </article>
  );
};
