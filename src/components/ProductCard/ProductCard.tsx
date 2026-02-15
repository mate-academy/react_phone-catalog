import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { CategoryType } from '../../types/Category';
import { useFavorites } from '../../context/Favoutires';
import { useCart } from '../../context/Cart';

type Props = {
  product: Product;
  showOldPrice: boolean;
  category: CategoryType;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showOldPrice,
  category,
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(product.itemId);

  const { addToCart, removeFromCart, isInCart } = useCart();
  const selectedProduct = isInCart(product.itemId);

  return (
    <div className={styles['product-card']}>
      <Link to={`/${category}/${product.itemId}`}>
        <img
          className={styles['product-card__img']}
          src={`./${product.image}`}
          alt="Product image"
        />
      </Link>
      <Link
        to={`/${category}/${product.itemId}`}
        className={styles['product-card__link-title']}
      >
        <h4 className={styles['product-card__title']}>{product.name}</h4>
      </Link>
      <div className={styles['product-card__price']}>
        <div className={styles['product-card__new-price']}>
          ${product.price}
        </div>
        {showOldPrice && (
          <div className={styles['product-card__old-price']}>
            ${product.fullPrice}
          </div>
        )}
      </div>
      <div className={styles['product-card__divider']}></div>
      <div className={styles['product-card__descr']}>
        <div className={styles['product-card__descr-box']}>
          <div className={styles['product-card__descr-title']}>Screen</div>
          <div className={styles['product-card__descr-text']}>
            {product.screen}
          </div>
        </div>
        <div className={styles['product-card__descr-box']}>
          <div className={styles['product-card__descr-title']}>Capacity</div>
          <div className={styles['product-card__descr-text']}>
            {product.capacity}
          </div>
        </div>
        <div className={styles['product-card__descr-box']}>
          <div className={styles['product-card__descr-title']}>RAM</div>
          <div className={styles['product-card__descr-text']}>
            {product.ram}
          </div>
        </div>
      </div>
      <div className={styles['product-card__link-box']}>
        <button
          className={`${styles['product-card__link']} ${selectedProduct ? styles['product-card__link--selected'] : ''}`}
          onClick={e => {
            e.preventDefault();
            if (selectedProduct) {
              removeFromCart(product.itemId);
            } else {
              addToCart(product);
            }
          }}
        >
          {selectedProduct ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={`${styles['product-card__link-favourite']} ${favorite ? styles['product-card__link-favourite--selected'] : ''}`}
          onClick={e => {
            e.preventDefault();
            toggleFavorite(product.itemId);
          }}
        ></button>
      </div>
    </div>
  );
};
