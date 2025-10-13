import { Product } from '../../interfaces/Product';
import styles from './GoodCard.module.scss';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../../Favorites/context/FavoritesContext';
import { CartButton } from '../../../Cart/components/CartButton';
import cartBtn from '../../../Cart/components/CartButton.module.scss';

interface PhoneCardProps {
  product: Product;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <article className={styles.card} data-qa="card">
      <div className={styles.card__top}>
        <Link to={`/${product.category}/${product.itemId}`}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.card__image}
          />
        </Link>
      </div>

      <h2 className={styles.card__name}>
        <Link to={`/${product.category}/${product.itemId}`}>
          {product.name}
        </Link>
      </h2>

      <div className={styles.card__prices}>
        <p className={styles.card__fullPrice}>${product.fullPrice}</p>
        <p className={styles.card__price}>${product.price}</p>
      </div>

      <p className={styles.card__settings}>
        <div className={styles.card__row}>
          <span className={styles['card__settings-name']}>Screen</span>
          <span className={styles['card__settings-value']}>
            {product.screen}
          </span>
        </div>
        <div className={styles.card__row}>
          <span className={styles['card__settings-name']}>Capacity</span>
          <span className={styles['card__settings-value']}>
            {product.capacity}
          </span>
        </div>
        <div className={styles.card__row}>
          <span className={styles['card__settings-name']}>RAM</span>
          <span className={styles['card__settings-value']}>{product.ram}</span>
        </div>
      </p>

      <div className={styles.card__buttons}>
        <CartButton product={product} className={cartBtn.small} />
        <a
          href="#"
          className={styles['card__buttons-fav']}
          onClick={e => {
            e.preventDefault();
            toggleFavorite(product);
          }}
        >
          <img
            src={
              isFavorite(product.id)
                ? './img/icons/fav-active.png'
                : './img/icons/fav.png'
            }
            alt="favourite goods"
          />
        </a>
      </div>
    </article>
  );
};
