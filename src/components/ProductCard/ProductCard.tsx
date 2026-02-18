import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useModal } from '../../context/ModalContext';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.fullPrice > product.price;
  const { addToCart, isProductInCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { showSuccessModal } = useModal();
  const isInCart = isProductInCart(product.itemId);
  const isProductFavorite = isFavorite(product.itemId);

  return (
    <div className={styles.productCard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.imageLink}
      >
        <img
          src={`${import.meta.env.BASE_URL}${product.image}`}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.nameLink}
      >
        <h3 className={styles.name}>{product.name}</h3>
      </Link>

      <div className={styles.prices}>
        <span className={styles.currentPrice}>${product.price}</span>
        {hasDiscount && (
          <span className={styles.oldPrice}>${product.fullPrice}</span>
        )}
      </div>

      <hr className={styles.separator} />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.addToCartBtn} ${isInCart ? styles.added : ''}`}
          onClick={e => {
            e.stopPropagation();
            if (!isInCart) {
              addToCart(product);
              showSuccessModal(`${product.name} foi adicionado ao carrinho!`);
            }
          }}
          disabled={isInCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={`${styles.favoriteBtn} ${isProductFavorite ? styles.favorite : ''}`}
          onClick={e => {
            e.stopPropagation();

            if (isProductFavorite) {
              removeFromFavorites(product.itemId);
            } else {
              addToFavorites(product);
            }
          }}
          aria-label={
            isProductFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          {isProductFavorite ? <IoHeart /> : <IoHeartOutline />}
        </button>
      </div>
    </div>
  );
}
