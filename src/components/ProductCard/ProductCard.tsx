import classNames from 'classnames';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  showOldPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showOldPrice }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();

  const toggleFavorite = () => {
    if (isFavorite(product.itemId)) {
      removeFavorite(product.itemId);
    } else {
      addFavorite(product);
    }
  };

  return (
    <div className={styles.productcard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        state={{ category: product.category, name: product.name }}
        className={styles.productcard__link}
      >
        <div className={styles.productcard__image}>
          <img src={`./${product.image}`} alt="Product photo" />
        </div>
        <div className={styles.productcard__content}>
          <div className={styles.productcard__name}>
            <p>{product.name}</p>
          </div>
          {showOldPrice ? (
            <div className={styles.productcard__prices}>
              <p className={styles.productcard__newPrice}>${product.price}</p>
              <p className={styles.productcard__oldPrice}>
                ${product.fullPrice}
              </p>
            </div>
          ) : (
            <div className={styles.productcard__price}>
              <p>${product.price}</p>
            </div>
          )}
          <div className={styles.productcard__line}></div>
          <div className={styles.productcard__detailes}>
            <div className={styles.productcard__detailesRow}>
              <span className={styles.productcard__detailesName}>Screen</span>
              <span className={styles.productcard__detailesValue}>
                {product.screen}
              </span>
            </div>
            <div className={styles.productcard__detailesRow}>
              <span className={styles.productcard__detailesName}>Capacity</span>
              <span className={styles.productcard__detailesValue}>
                {product.capacity.replace('GB', ' GB')}
              </span>
            </div>
            <div className={styles.productcard__detailesRow}>
              <span className={styles.productcard__detailesName}>RAM</span>
              <span className={styles.productcard__detailesValue}>
                {product.ram.replace('GB', ' GB')}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className={styles.productcard__buttons}>
        <button
          className={classNames(styles['productcard__buttons-add'], {
            [styles['productcard__buttons-add--active']]: isInCart(
              product.itemId,
            ),
          })}
          onClick={() => addToCart(product)}
        >
          {isInCart(product.itemId) ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={styles['productcard__buttons-fav']}
          onClick={() => toggleFavorite()}
        >
          <img
            src={
              isFavorite(product.itemId)
                ? './img/Icons/favorites-filled.svg'
                : './img/Icons/favorites.svg'
            }
            alt="Add to favorites"
          />
        </button>
      </div>
    </div>
  );
};
