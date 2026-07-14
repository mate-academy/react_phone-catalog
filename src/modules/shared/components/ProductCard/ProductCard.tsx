import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { SquareButton } from '../SquareButton';
import { FavoriteButton } from '../FavoriteButton';
import { Link, useLocation } from 'react-router-dom';
import { ProgressiveImage } from '../ProgressiveImage/ProgressiveImage';
import { ShortSpec } from '../ShortSpec';
import { SpecItem } from '../ShortSpec/types';
import { useFavorites } from '../../store/FavoritesContext';
import { useCartDispatch, useCartState } from '../../store/CartContext';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const dispatch = useCartDispatch();
  const state = useCartState();
  const location = useLocation();

  const specs: SpecItem[] = [
    { key: 'Screen', value: product.screen },
    { key: 'Capacity', value: product.capacity },
    { key: 'RAM', value: product.ram },
  ];

  const isProductInCart = state.cartItems.some(
    item => item.product.itemId === product.itemId,
  );

  return (
    <article className={styles['product-card']}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles['product-card__link']}
        state={{ from: location.pathname + location.search }}
      >
        <div className={styles['product-card__photo-wrapper']}>
          <ProgressiveImage
            src={product.image}
            alt={product.name}
            className={styles['product-card__photo']}
          />
        </div>

        <p className={styles['product-card__text']}>{product.name}</p>
      </Link>

      <div className={styles['product-card__price-row']}>
        <data
          className={styles['product-card__price-current']}
          value={product.price}
        >
          {`$${product.price}`}
        </data>
        {product.fullPrice && (
          <data
            className={styles['product-card__price-old']}
            value={product.fullPrice}
          >
            {`$${product.fullPrice}`}
          </data>
        )}
      </div>

      <div className={styles['product-card__line']}></div>

      <ShortSpec
        className={styles['product-card__short-spec']}
        specList={specs}
      />

      <div className={styles['product-card__product-manager']}>
        <SquareButton
          className={styles['product-card__cart']}
          onClick={() => dispatch({ type: 'addProduct', product })}
          selected={isProductInCart}
        >
          {!isProductInCart ? 'Add to cart' : 'Added to cart'}
        </SquareButton>
        <FavoriteButton
          className={styles['product-card__fav']}
          onClick={() => toggleFavorite(product)}
          selected={isFavorite(product.itemId)}
        />
      </div>
    </article>
  );
};
