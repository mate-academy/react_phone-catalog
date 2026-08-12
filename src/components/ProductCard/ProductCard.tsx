import { Link } from 'react-router-dom';

import { Button } from '../Button';
import { FadeImage } from '../FadeImage';
import { IconButton } from '../IconButton';
import { useTranslation } from '../../hooks';
import { addToCart } from '../../store/cartSlice';
import { toggleFavorite } from '../../store/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { ProductFromServer } from '../../types/product';
import styles from './ProductCard.module.scss';

type Props = {
  product: ProductFromServer;
  isBrandNew?: boolean;
};

export const ProductCard = ({ product, isBrandNew = false }: Props) => {
  const dispatch = useAppDispatch();
  const t = useTranslation();

  const cartItems = useAppSelector(state => state.cart.items);
  const favoriteItemIds = useAppSelector(state => state.favorites.itemIds);

  const imageSrc = `${import.meta.env.BASE_URL}${product.image}`;
  const productLink = `/${product.category}/${product.itemId}`;

  const isInCart = cartItems.some(item => item.itemId === product.itemId);
  const isFavorite = favoriteItemIds.includes(product.itemId);

  const visiblePrice = isBrandNew ? product.fullPrice : product.price;
  const shouldShowRegularPrice =
    !isBrandNew && product.fullPrice > product.price;

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(product.itemId));
    }
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.itemId));
  };

  return (
    <article className={styles.card}>
      <Link
        className={styles.imageLink}
        to={productLink}
        aria-label={`${t.productCard.openProduct}: ${product.name}`}
      >
        <FadeImage className={styles.image} src={imageSrc} alt={product.name} />
      </Link>

      <Link className={styles.title} to={productLink}>
        {product.name}
      </Link>

      <div className={styles.price}>
        <span className={styles.priceDiscount}>${visiblePrice}</span>

        {shouldShowRegularPrice && (
          <span className={styles.priceRegular}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <dl className={styles.specs}>
        <div className={styles.spec}>
          <dt className={styles.specName}>{t.productCard.screen}</dt>
          <dd className={styles.specValue}>{product.screen}</dd>
        </div>

        <div className={styles.spec}>
          <dt className={styles.specName}>{t.productCard.capacity}</dt>
          <dd className={styles.specValue}>{product.capacity}</dd>
        </div>

        <div className={styles.spec}>
          <dt className={styles.specName}>{t.productCard.ram}</dt>
          <dd className={styles.specValue}>{product.ram}</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <Button
          className={styles.cartButton}
          isSelected={isInCart}
          fullWidth
          onClick={handleAddToCart}
        >
          {isInCart ? t.productCard.addedToCart : t.productCard.addToCart}
        </Button>

        <IconButton
          icon={isFavorite ? 'heartFilled' : 'heart'}
          label={
            isFavorite
              ? t.productCard.removeFromFavorites
              : t.productCard.addToFavorites
          }
          shape="favorite"
          isSelected={isFavorite}
          onClick={handleToggleFavorite}
        />
      </div>
    </article>
  );
};
