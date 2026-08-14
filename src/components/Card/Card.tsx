import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  addItem as addToCartAction,
  selectCartItems,
} from '../../store/slices/cartSlice';
import {
  addItem as addToFavoritesAction,
  removeItem as removeFromFavoritesAction,
  selectFavoritesItems,
} from '../../store/slices/favoritesSlice';
import styles from './style.module.scss';

interface CardProps {
  extraClassName?: 'catalogueCard';
  product?: Product;
  showDiscount?: boolean;
}

interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

const Card: React.FC<CardProps> = ({
  extraClassName,
  product,
  showDiscount = false,
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const favoritesItems = useAppSelector(selectFavoritesItems);

  if (!product) {
    return null;
  }

  const imagePath = product.image.startsWith('/')
    ? `${import.meta.env.BASE_URL}${product.image.slice(1)}`
    : `${import.meta.env.BASE_URL}${product.image}`;

  const extraClass = extraClassName ? styles.catalogueCard : '';
  const cardClasses = `${styles.card} ${extraClass}`;
  const productLink = `/${product.category}/${product.itemId}`;

  const isInCart = cartItems.some(item => item.id === product.itemId);
  const isInFavorites = favoritesItems.some(item => item.id === product.itemId);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInCart) {
      dispatch(
        addToCartAction({
          id: product.itemId,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
        }),
      );
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInFavorites) {
      dispatch(removeFromFavoritesAction(product.itemId));
    } else {
      dispatch(
        addToFavoritesAction({
          id: product.itemId,
          category: product.category,
          name: product.name,
          price: product.price,
          fullPrice: product.fullPrice,
          image: product.image,
          screen: product.screen,
          capacity: product.capacity,
          ram: product.ram,
        }),
      );
    }
  };

  return (
    <>
      <div className={cardClasses}>
        <Link to={productLink} className={styles.card_imageLink}>
          <div className={styles.card_image}>
            <img src={imagePath} alt={product.name} />
          </div>
        </Link>

        <Link to={productLink} className={styles.card_nameLink}>
          <div className={styles.card_name}>{product.name}</div>
        </Link>

        <div className={styles.card_price}>
          {showDiscount ? (
            <>
              <h3 className={styles.card_price_current}>${product.price}</h3>
              <span className={styles.card_price_full}>
                ${product.fullPrice}
              </span>
            </>
          ) : (
            <h3 className={styles.card_price_current}>${product.fullPrice}</h3>
          )}
        </div>

        <hr className={styles.card_separator} />

        <div className={styles.card_chars}>
          <div className={styles.card_chars_between}>
            <span className={styles.card_chars_gray}>Screen</span>
            <span className="text_small">{product.screen}</span>
          </div>
          <div className={styles.card_chars_between}>
            <span className={styles.card_chars_gray}>Capacity</span>
            <span className="text_small">{product.capacity}</span>
          </div>
          <div className={styles.card_chars_between}>
            <span className={styles.card_chars_gray}>RAM</span>
            <span className="text_small">{product.ram}</span>
          </div>
        </div>

        <div>
          <div className={styles.card_buttons}>
            <button
              className={`${styles.card_buttons_add} ${isInCart ? styles.card_buttons_added : ''} black_button`}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={`${styles.card_buttons_fav} ${isInFavorites ? styles.card_buttons_fav_active : ''}`}
              onClick={handleToggleFavorite}
              aria-label={
                isInFavorites ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <img
                src={
                  isInFavorites
                    ? `${import.meta.env.BASE_URL}img/icons/Favourites_Filled_(Heart Like).svg`
                    : `${import.meta.env.BASE_URL}img/icons/Favourites_(Heart_Like).svg`
                }
                alt={
                  isInFavorites ? 'Remove from favorites' : 'Add to favorites'
                }
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
