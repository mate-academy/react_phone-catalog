import styles from './ProductCard.module.scss';

import { Product } from '../../../public/api/types/Product';
import { Link } from 'react-router-dom';
import FavouritesLink from '../FavouritesLink/index';
import AddToCartButton from '../AddToCartButton';
import Button from '../Button/index';
import buttonStyles from '../Button/Button.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import clsx from 'clsx';

type ProductCardProps = {
  product: Product;
  index: number;
  className?: string;
  skipDiscount?: boolean;
};
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  className,
  skipDiscount = false,
}) => {
  const visibleOnTablet = 2;
  const visibleOnDesktop = 4;
  const { items, addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isInCart = items.find(item => item.product.id === product.id);

  return (
    <div
      className={clsx(
        styles.productCard,
        styles.productCard__product,
        className,
        { [styles.mobile]: index === 1 },
        { [styles.tablet]: index > 1 && index <= visibleOnTablet },
        { [styles.desktop]: index <= visibleOnDesktop },
      )}
    >
      <div className={styles.productCard__productInfo}>
        <div className={styles.productCard__productImageContainer}>
          <img
            src={product.image}
            alt={product.name ?? 'Product Image'}
            className={styles.productCard__productImage}
          />
        </div>
        <Link
          to={`/product/${product.id}`}
          className={styles.productCard__productName}
        >
          {product.name}
        </Link>
        <div className={styles.productPriceRow}>
          <p className={styles.productCard__productPrice}>
            <span>${product.price}&nbsp;</span>
          </p>
          {!skipDiscount && (
            <p className={styles.productCard__productFullPrice}>
              ${product.fullPrice ? product.fullPrice : null}
            </p>
          )}
        </div>
        <div className={styles.productCard__productInfoTable}>
          <div className={styles.productFeature}>Screen</div>
          <div className={styles.productValue}>{product.screen}</div>
          <div className={styles.productFeature}>Capacity</div>
          <div className={styles.productValue}>{product.capacity}</div>
          <div className={styles.productFeature}>RAM</div>
          <div className={styles.productValue}>{product.ram}</div>
        </div>
        <div className={styles.productCard__bottom}>
          <AddToCartButton
            onClick={() => addToCart(product)}
            isInCart={isInCart}
          />
          <Button
            className={clsx(
              buttonStyles.button,
              buttonStyles['button--favourites'],
            )}
            onClick={() => toggleFavorite(String(product.id))}
            isActive={isFavorite(product.id)}
          >
            <FavouritesLink
              className={clsx(
                styles['icon--large'],
                styles['icon--favourites'],
              )}
              iconSize="lg"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
