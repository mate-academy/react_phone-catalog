import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoritesContext';
import { HeartIcon } from '../../ui/Icons/Icons';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { cartItems, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const isInCart = cartItems.some(item => item.id === product.itemId);
  const isFavorite = favorites.some(item => item.itemId === product.itemId);
  const hasDiscount = product.fullPrice > product.price;

  return (
    <article className={styles.card} data-cy="cardsContainer">
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.imageLink}
      >
        <img
          src={`/${product.image}`}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.name}
      >
        {product.name}
      </Link>

      <div className={styles.priceRow}>
        <span className={styles.price}>${product.price}</span>
        {hasDiscount && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <ul className={styles.specs}>
        <li className={styles.specItem}>
          <span>Screen</span>
          <span>{product.screen}</span>
        </li>
        <li className={styles.specItem}>
          <span>Capacity</span>
          <span>{product.capacity}</span>
        </li>
        <li className={styles.specItem}>
          <span>RAM</span>
          <span>{product.ram}</span>
        </li>
      </ul>

      <div className={styles.actions}>
        <button
          type="button"
          className={cn(styles.addButton, {
            [styles.addButtonActive]: isInCart,
          })}
          onClick={() => addToCart(product)}
          disabled={isInCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={cn(styles.favoriteButton, {
            [styles.favoriteButtonActive]: isFavorite,
          })}
          onClick={() => toggleFavorite(product)}
          aria-label={
            isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
          }
          aria-pressed={isFavorite}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
    </article>
  );
};
