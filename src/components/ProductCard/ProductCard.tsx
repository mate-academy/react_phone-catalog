import { withBase } from '../../utils/withBase';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import cn from 'classnames';
import { IconHeart, IconHeartFilled } from '../Icons';
import styles from './ProductCard.module.scss';

type ProductCardProps = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard = ({
  product,
  showDiscount = true,
}: ProductCardProps) => {
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToCart,
    removeFromCart,
    isInCart,
  } = useShop();

  const favorite = isFavorite(product.id);
  const inCart = isInCart(product.id);
  const detailsPath = `/product/${product.itemId}`;

  const specs = [
    { name: 'Screen', value: product.screen },
    { name: 'Capacity', value: product.capacity },
    { name: 'RAM', value: product.ram },
  ];

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleToggleCart = () => {
    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <article className={styles.card} data-cy="card">
      <Link to={detailsPath} className={styles.imageLink}>
        <img
          src={withBase(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={detailsPath} className={styles.title}>
        <h2 className={styles.titleText}>{product.name}</h2>
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>{`$${product.price}`}</span>

        {showDiscount && product.fullPrice > product.price && (
          <span className={styles.fullPrice}>{`$${product.fullPrice}`}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        {specs.map(spec => (
          <div className={styles.specRow} key={spec.name}>
            <span className={styles.specName}>{spec.name}</span>
            <span className={styles.specValue}>{spec.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={cn(styles.addButton, {
            [styles.addButtonAdded]: inCart,
          })}
          onClick={handleToggleCart}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={favorite}
          className={cn(styles.favButton, {
            [styles.favButtonActive]: favorite,
          })}
          onClick={handleToggleFavorite}
        >
          {favorite ? <IconHeartFilled /> : <IconHeart />}
        </button>
      </div>
    </article>
  );
};
