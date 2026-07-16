//#region imports
import styles from './BrandCard.module.scss';
import like from '../../icons/like.svg';
import isLike from '../../icons/IsLike.svg';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
//#endregion

type Props = {
  product: Product;
};

export function BrandCard({ product }: Props) {
  const navigate = useNavigate();

  const { itemId, category, name, price, image, screen, capacity, ram } =
    product;

  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleCart, isInCart } = useCart();

  const isLiked = isFavorite(itemId);
  const inCart = isInCart(itemId);

  return (
    <div
      className={styles.brandCard}
      onClick={() => navigate(`/${category}/${itemId}`)}
    >
      <div className={styles.brandCard__imgblock}>
        <img
          src={`${import.meta.env.BASE_URL}/${image}`}
          alt={name}
          className={styles.brandCard__img}
        />
      </div>
      <h2 className={styles.brandCard__title}>{name}</h2>
      <p className={styles.brandCard__price}>${price}</p>
      <hr className={styles.brandCard__divider} />
      <div className={styles.brandCard__params}>
        <div className={styles.brandCard__params__item}>
          <p className={styles.brandCard__params__title}>Screen</p>
          <p className={styles.brandCard__params__value}>{screen}</p>
        </div>
        <div className={styles.brandCard__params__item}>
          <p className={styles.brandCard__params__title}>Capacity</p>
          <p className={styles.brandCard__params__value}>{capacity}</p>
        </div>
        <div className={styles.brandCard__params__item}>
          <p className={styles.brandCard__params__title}>Ram</p>
          <p className={styles.brandCard__params__value}>{ram}</p>
        </div>
      </div>
      <div className={styles.brandCard__buttons}>
        <button
          className={`${styles.brandCard__buttons__cart} ${inCart ? styles.brandCard__buttons__cart_added : ''}`}
          onClick={e => {
            e.stopPropagation();
            toggleCart(product);
          }}
        >
          {inCart ? 'Added to cart' : 'Add to Cart'}
        </button>
        <button
          className={`${styles.brandCard__buttons__fav}`}
          onClick={e => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
        >
          {isLiked ? <img src={isLike} alt="" /> : <img src={like} alt="" />}
        </button>
      </div>
    </div>
  );
}
