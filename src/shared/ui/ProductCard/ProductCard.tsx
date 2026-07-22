// #regionImport
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

import { useFavourites } from '@shared/context/FavouritesContext';
import { useCart } from '@shared/context/CartContext';
import { getShortSpecs } from '@shared/utils/getShortSpecs';

import { Product } from 'src/types/Product';
import { Button } from '@shared/ui/Button';
import { FavouriteButton } from '@shared/ui/FavouriteButton';
import { Divider } from '../Divider';
import { useTranslation } from 'react-i18next';
// #endregion

type Props = {
  product: Product;
  showOldPrice?: boolean;
  className?: string;
};

export const ProductCard = forwardRef<HTMLDivElement, Props>(
  ({ product, showOldPrice = true, className }, ref) => {
    const { toggle, isFavourite } = useFavourites();
    const { addToCart, isInCart } = useCart();
    const { t } = useTranslation();

    const specs = getShortSpecs(product);

    return (
      <article ref={ref} className={`${styles.card} ${className || ''}`}>
        <Link to={`/product/${product.itemId}`}>
          <div className={styles.cardImageWrapper}>
            <img
              className={styles.cardImage}
              src={product.image}
              alt={product.name}
            />
          </div>
        </Link>

        <Link to={`/product/${product.itemId}`} className={styles.cardTitle}>
          {product.name}
        </Link>

        <div className={styles.cardPrices}>
          <p className={styles.cardPrice}>${product.price}</p>

          {showOldPrice && (
            <p className={styles.cardOldPrice}>${product.fullPrice}</p>
          )}
        </div>

        <Divider />

        <div className={styles.cardInfo}>
          {specs.map(spec => (
            <div key={spec.translationKey} className={styles.cardSpec}>
              <span className={styles.cardSpecTitle}>
                {t(spec.translationKey)}
              </span>
              <span className={styles.cardSpecValue}>{spec.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.cardButtons}>
          <Button
            onClick={e => {
              e.preventDefault();
              addToCart(product);
            }}
            disabled={isInCart(product.itemId)}
            isActive={isInCart(product.itemId)}
          >
            {isInCart(product.itemId)
              ? t('buttons.added')
              : t('buttons.addToCard')}
          </Button>

          <FavouriteButton
            isActive={isFavourite(product.itemId)}
            onClick={e => {
              e.preventDefault();
              toggle(product);
            }}
          />
        </div>
      </article>
    );
  },
);

ProductCard.displayName = 'ProductCard';
