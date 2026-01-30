import styles from '../ProductsCards/ProductsCards.module.scss';
import likeActive from './../../img/icons/Favourites Filled (Heart Like).svg';

type CardFavoritesProps = {
  id: string;
  category: string;
  itemId: string;
  name: string;
  fullPrice?: number;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  image: string;
  onRemove: (id: string) => void;
};

export const CardFavorites: React.FC<CardFavoritesProps> = ({
  id,
  itemId,
  name,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  image,
  onRemove,
}) => {
  return (
    <article className={styles.card}>
      <a href={`/product/${itemId}`} className={styles.imgWrap}>
        <img
          src={import.meta.env.BASE_URL + image}
          alt={name}
          className={styles.cardImg}
        />
      </a>

      <h3 className={styles.cardName}>
        <a href={`/product/${itemId}`} className={styles.cardLink}>
          {name}
        </a>
      </h3>

      <div className={styles.priceRow}>
        {fullPrice && fullPrice !== price ? (
          <>
            <span className={styles.price}>${price}</span>
            <span className={styles.fullPrice}>${fullPrice}</span>
          </>
        ) : (
          <span className={styles.price}>${price}</span>
        )}
      </div>

      <span className={styles.line}></span>

      <div className={styles.infoLine}>
        <p className={styles.label}>Screen</p>
        <p className={styles.value}>{screen}</p>
      </div>

      {capacity && (
        <div className={styles.infoLine}>
          <p className={styles.label}>Capacity</p>
          <p className={styles.value}>{capacity}</p>
        </div>
      )}

      {ram && (
        <div className={styles.infoLine}>
          <p className={styles.label}>RAM</p>
          <p className={styles.value}>{ram}</p>
        </div>
      )}

      <div className={styles.addBlock}>
        <button className={styles.btn} type="button">
          Add to cart
        </button>

        <button
          className={styles.likeBtn}
          type="button"
          onClick={() => onRemove(id)}
        >
          <img src={likeActive} alt="liked" />
        </button>
      </div>
    </article>
  );
};
