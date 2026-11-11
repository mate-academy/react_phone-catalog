import { Link } from 'react-router-dom';
import {
  NormalizedProduct,
  Product,
  ProductDetails,
} from '../../../interfaces/Product';
import { normalizeProduct } from '../../../utils/normalizeProduct';
import styles from './ProductCard.module.scss';
import { useFavourites } from '../../../context/FavouritesContext';
import { useCart } from '../../../context/CartContext';

type Props = {
  item: Product | ProductDetails | NormalizedProduct;
};

export const ProductCard = ({ item }: Props) => {
  const product = normalizeProduct(item);
  const { toggleFavourite, isFavourite } = useFavourites();
  const { addToCart, isInCart } = useCart();

  const handleAddToCartClcik = (
    event: React.MouseEvent,
    cartProduct: NormalizedProduct,
  ) => {
    event.preventDefault();

    addToCart(cartProduct);
  };

  const handleAddToFavourite = (
    event: React.MouseEvent,
    toggleProduct: NormalizedProduct,
  ) => {
    event.preventDefault();

    toggleFavourite(toggleProduct);
  };

  return (
    <Link
      className={styles.card}
      key={product.id}
      to={`/${product.category}/${product.id}`}
      state={{ productName: product.name }}
    >
      <img
        className={styles.card__img}
        src={`/${product.image}`}
        alt={product.name}
      />
      <span className={styles.card__name}>{product.name}</span>
      <div className={styles.card__prices}>
        <span className={styles.card__price}>${product.price}</span>
        {product.price !== product.fullPrice && (
          <span className={styles.card__price_old}>${product.fullPrice}</span>
        )}
      </div>
      <div className={styles.card__border}></div>
      <ul className={`spec__list ${styles.card__chars}`}>
        <li className="spec__item">
          <span className="spec__name">Screen</span>
          <span className="spec__value">{product.screen}</span>
        </li>
        <li className="spec__item">
          <span className="spec__name">Capacity</span>
          <span className="spec__value">{product.capacity}</span>
        </li>
        <li className="spec__item">
          <span className="spec__name">RAM</span>
          <span className="spec__value">{product.ram}</span>
        </li>
      </ul>
      <div className={styles.card__actions}>
        <button
          className={`btn ${isInCart(product.id) ? 'btn--selected' : ''}`}
          onClick={event => handleAddToCartClcik(event, product)}
        >
          {isInCart(product.id) ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={`favourite-btn ${isFavourite(product.id) ? 'favourite-btn--active' : ''}`}
          onClick={event => handleAddToFavourite(event, product)}
        />
      </div>
    </Link>
  );
};
