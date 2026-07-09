import styles from './ProductCard.module.scss';
import heartImg from '../../items/vector_heart.png';
import selectedHeart from '../../items/selected_heart.png';
import { useFavourites } from '../../context/Favouritescontext';
import { useCart } from '../../context/Cartcontext';

type Props = {
  id: string | number;
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  hasDiscount?: boolean;
  onCartClick?: () => void;
};

export const ProductCard = ({
  id,
  image,
  name,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  hasDiscount = true,
  onCartClick,
}: Props) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  const { isInCart, addToCart } = useCart();

  const strId = String(id);
  const favourite = isFavourite(strId);
  const inCart = isInCart(strId);

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite({
      id: strId,
      image,
      name,
      price,
      fullPrice,
      screen,
      capacity,
      ram,
    });
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart) {
      addToCart({ id: strId, image, name, price });
      onCartClick?.(); // 👈 викликати колбек
    }
  };

  return (
    <article className={styles.product_card}>
      <div className={styles.product_img_container}>
        <img
          className={styles.product_img}
          src={image}
          alt={name}
          loading="lazy"
        />
      </div>

      <h3 className={styles.product_title}>{name}</h3>

      <div className={styles.product_price}>
        <span className={styles.price_new}>${price}</span>
        {hasDiscount && fullPrice > price && (
          <span className={styles.price_old}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.product_hr} />

      <div className={styles.product_properties}>
        <div className={styles.property_row}>
          <span className={styles.property_label}>Screen</span>
          <span className={styles.property_value}>{screen}</span>
        </div>
        <div className={styles.property_row}>
          <span className={styles.property_label}>Capacity</span>
          <span className={styles.property_value}>{capacity}</span>
        </div>
        <div className={styles.property_row}>
          <span className={styles.property_label}>RAM</span>
          <span className={styles.property_value}>{ram}</span>
        </div>
      </div>

      <div className={styles.product_buttons}>
        <button
          type="button"
          className={`${styles.btn_cart} ${inCart ? styles.is_in_cart : ''}`}
          onClick={handleCartClick}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={`${styles.btn_favorite} ${favourite ? styles.btn_favorite_active : ''}`}
          aria-label={favourite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={handleFavouriteClick}
        >
          <img
            className={styles.btn_favorite_img}
            src={favourite ? selectedHeart : heartImg}
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
};
