import { useFavourites } from '../../context/FavouritesContext';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  isNewModelsBlock?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, isNewModelsBlock }) => {
  const { favourites, toggleProduct } = useFavourites();
  const { cart, addProductToCart } = useCart();

  const isAddedToFavourites = favourites.some(p => p.id === product.id);
  const isAddedToCart = cart.some(p => p.id === product.id);

  const handleToggleFavourite = () => toggleProduct(product);

  const handleAddProductToCart = () => addProductToCart(product);

  // console.log(product)

  return (
    <div className={styles.product}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <div className={styles.product__image}>
          <img src={`/public/${product.image}`} alt="product image" />
        </div>
        <p className={styles.product__name}>{product.name}</p>
        <div className={styles.product__prices}>
          <p className={styles.product__price}>${product.price}</p>
          {!isNewModelsBlock && (
            <p className={styles.product__price_full}>${product.fullPrice}</p>
          )}
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
      </Link>

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
