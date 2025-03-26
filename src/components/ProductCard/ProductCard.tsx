import { useFavourites } from '../../context/FavouritesContext';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useCart } from '../../context/CartContext';

type Props = {
  product: Product;
  isHotPriceBlock?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { favourites, toggleProduct } = useFavourites();
  const { cart, addProductToCart } = useCart();

  const isAddedToFavourites = favourites.some(p => p.id === product.id);
  const isAddedToCart = cart.some(p => p.id === product.id);

  const handleToggleFavourite = () => {
    toggleProduct(product);
  };

  const handleAddProductToCart = () => {
    addProductToCart(product);
  };

  return (
    <div className={styles.product}>
      <div className={styles.product__image}>
        <img src={`/public/${product.image}`} alt="" />
      </div>
      <p className={styles.product__name}>{product.name}</p>
      <div className={styles.product__prices}>
        <p className={styles.product__price}>${product.price}</p>
        <p className={styles.product__price_full}>${product.fullPrice}</p>
      </div>

      <div className={styles.product__features}>
        <div className={styles.product__feature}>
          <p className={styles.product__param}>Screen</p>
          <p className={styles.product__value}>{product.screen}</p>
        </div>
        <div className={styles.product__feature}>
          <p className={styles.product__param}>Capacity</p>
          <p className={styles.product__value}>{product.capacity}</p>
        </div>
        <div className={styles.product__feature}>
          <p className={styles.product__param}>RAM</p>
          <p className={styles.product__value}>{product.ram}</p>
        </div>
      </div>

      <div className={styles.product__buttons}>
        <button
          className={`${styles.product__cart} ${isAddedToCart && styles.product__cart_active}`}
          onClick={handleAddProductToCart}
          disabled={isAddedToCart}
        >
          {isAddedToCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={styles.product__favourites}
          onClick={handleToggleFavourite}
        >
          <img
            src={`/public/img/icons/favourites-icon${isAddedToFavourites ? '-active' : ''}.svg`}
            alt="favourites"
          />
        </button>
      </div>
    </div>
  );
};
