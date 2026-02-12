import { Link } from 'react-router-dom';
import { ProductButtons } from '@components/ProductButtons';
import { Product } from '@models/Product';
import { useFavourites } from '@context/FavoriteContext';
import { useCart } from '@context/CartContext';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  withFullPrice: boolean;
  isLightMode: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  withFullPrice,
  isLightMode,
}) => {
  const { favourites, addToFavourites, removeFromFavourites, isFavourite } =
    useFavourites();
  const { cartProducts, addToCart, removeFromCart, isInCart } = useCart();

  const handleFavouriteClick = () => {
    if (favourites.includes(product.id.toString())) {
      removeFromFavourites(product.id.toString());
    } else {
      addToFavourites(product.id.toString());
    }
  };

  const handleCartClick = () => {
    if (cartProducts.some(cart => cart.id === product.id.toString())) {
      removeFromCart(product.id.toString());
    } else {
      addToCart(product.id.toString());
    }
  };

  return (
    <div className={styles.product__card}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.product__card__item}
      >
        <img
          className={styles.product__card__img}
          src={product.image}
          alt={`${product.name} image`}
        />
      </Link>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.product__card__title}
      >
        {product.name}
      </Link>
      <div className={styles['product__card__box-price']}>
        <h3 className={styles.product__card__price}>${product.price}</h3>
        {withFullPrice === true && (
          <h3 className={styles.product__card__fullPrice}>
            ${product.fullPrice}
          </h3>
        )}
      </div>
      <ul className={styles.product__card__details}>
        <li className={styles.product__card__info}>
          <span className={styles.product__card__field}>Screen</span>
          <span className={styles.product__card__value}>{product.screen}</span>
        </li>
        <li className={styles.product__card__info}>
          <span className={styles.product__card__field}>Capacity</span>
          <span className={styles.product__card__value}>
            {product.capacity}
          </span>
        </li>
        <li className={styles.product__card__info}>
          <span className={styles.product__card__field}>RAM</span>
          <span className={styles.product__card__value}>{product.ram}</span>
        </li>
      </ul>

      <ProductButtons
        isInCart={isInCart(product.id.toString())}
        handleCartClick={handleCartClick}
        isFavourite={isFavourite(product.id.toString())}
        handleFavouriteClick={handleFavouriteClick}
        isLightMode={isLightMode}
      />
    </div>
  );
};
