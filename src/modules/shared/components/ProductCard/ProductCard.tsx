import { Product } from '../../types/Product';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { AddToCartButton } from '../AddToCartButton';
import { FavoriteButton } from '../FavoriteButton';
import { useShop } from '../../../../context/ShopContext';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const capacityLabel =
    product.category === 'accessories' ? 'Size' : 'Capacity';

  const { addToCart, isInCart, isFavorite, toggleFavorite } = useShop();
  const isProductInCart = isInCart(product.id);
  const isProductFavorite = isFavorite(product.id);

  return (
    <article className={styles.card}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.card__imageLink}
      >
        <img
          src={product.image}
          alt={product.name}
          className={styles.card__image}
        />
      </Link>

      <Link className={styles.card__title} to={`/product/${product.itemId}`}>
        {product.name}
      </Link>

      <div className={styles.card__prices}>
        <p className={styles.card__price}>{`$${product.price}`}</p>
        <p className={styles.card__fullPrice}>{`$${product.fullPrice}`}</p>
      </div>

      <span className={styles.card__divider} />

      <div className={styles.card__specs}>
        <p className={styles.card__spec}>
          <span className={styles.card__specName}>Screen</span>
          <span className={styles.card__specValue}>{product.screen}</span>
        </p>
        <p className={styles.card__spec}>
          <span className={styles.card__specName}>{capacityLabel}</span>
          <span className={styles.card__specValue}>{product.capacity}</span>
        </p>
        <p className={styles.card__spec}>
          <span className={styles.card__specName}>RAM</span>
          <span className={styles.card__specValue}>{product.ram}</span>
        </p>
      </div>

      <div className={styles.card__actions}>
        <AddToCartButton
          isSelected={isProductInCart}
          onClick={() => addToCart(product)}
          disabled={isProductInCart}
          className={styles.card__cartButton}
        >
          {isProductInCart ? 'Added to cart' : 'Add to cart'}
        </AddToCartButton>
        <FavoriteButton
          className={styles.card__favoriteButton}
          isSelected={isProductFavorite}
          onClick={() => toggleFavorite(product)}
        />
      </div>
    </article>
  );
};
