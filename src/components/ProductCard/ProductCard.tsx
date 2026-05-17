import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { getAssetUrl } from '../../utils/asset';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  showDiscount?: boolean;
  scrollToTopOnClick?: boolean;
};

export const ProductCard = ({
  product,
  showDiscount = true,
  scrollToTopOnClick = false,
}: Props) => {
  const { toggleCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const inCart = isInCart(product.itemId);
  const favorite = isFavorite(product.itemId);
  const productImage = product.image.startsWith('img/')
    ? getAssetUrl(product.image)
    : product.image;
  const handleCardClick = () => {
    if (scrollToTopOnClick) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <article className={styles.card}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.imageWrap}
        onClick={handleCardClick}
      >
        <img src={productImage} alt={product.name} className={styles.image} />
      </Link>

      <Link
        to={`/product/${product.itemId}`}
        className={styles.name}
        onClick={handleCardClick}
      >
        {product.name}
      </Link>

      <p className={styles.prices}>
        <strong>${showDiscount ? product.price : product.fullPrice}</strong>
        {showDiscount && <span>${product.fullPrice}</span>}
      </p>

      <div className={styles.meta}>
        <div>
          <span>Screen</span>
          <b>{product.screen}</b>
        </div>
        <div>
          <span>Capacity</span>
          <b>{product.capacity}</b>
        </div>
        <div>
          <span>RAM</span>
          <b>{product.ram}</b>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={classNames(styles.cartBtn, { [styles.added]: inCart })}
          onClick={() => toggleCart(product.itemId)}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={classNames(styles.favBtnLike, {
            [styles.activeFav]: favorite,
          })}
          onClick={() => toggleFavorite(product.itemId)}
          aria-label="Toggle favorite"
        >
          <img
            src={
              favorite
                ? getAssetUrl('img/Favourites%20Filled%20(Heart%20Like).png')
                : getAssetUrl('img/Favourites%20(Heart%20Like).png')
            }
            alt="Favorites"
            className={styles.favIcon}
          />
        </button>
      </div>
    </article>
  );
};
