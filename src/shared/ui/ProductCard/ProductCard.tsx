// #regionImport
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './ProductCard.module.scss';
import { getShortSpecs } from '@shared/utils/getShortSpecs';

import { Product } from 'src/types/Product';
import { Button } from '@shared/ui/Button';
import { FavouriteButton } from '@shared/ui/FavouriteButton';
import { Divider } from '../Divider';
import { useAppDispatch, useAppSelector } from '@src/app/hooks';
import { selectIsFavourite } from '@src/features/favourites/selectors';
import { actions as favouriteActions } from '@src/features/favourites';
import { selectIsCart } from '@src/features/cart/selectors';
import { actions as cartActions } from '@src/features/cart';
// #endregion

type Props = {
  product: Product;
  showOldPrice?: boolean;
  className?: string;
};

export const ProductCard = forwardRef<HTMLDivElement, Props>(
  ({ product, showOldPrice = true, className }, ref) => {
    const dispatch = useAppDispatch();
    const isFavourite = useAppSelector(state =>
      selectIsFavourite(state, product.itemId),
    );
    const isInCart = useAppSelector(state =>
      selectIsCart(state, product.itemId),
    );
    const { t } = useTranslation();

    const specs = getShortSpecs(product);

    return (
      <article ref={ref} className={`${styles.card} ${className || ''}`}>
        <Link to={`/product/${product.category}/${product.itemId}`}>
          <div className={styles.cardImageWrapper}>
            <img
              className={styles.cardImage}
              src={product.image}
              alt={product.name}
            />
          </div>
        </Link>

        <Link
          to={`/product/${product.category}/${product.itemId}`}
          className={styles.cardTitle}
        >
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
              dispatch(cartActions.toggleCartItem(product));
            }}
            isActive={isInCart}
          >
            {isInCart ? t('buttons.added') : t('buttons.addToCard')}
          </Button>

          <FavouriteButton
            isActive={isFavourite}
            onClick={e => {
              e.preventDefault();
              dispatch(favouriteActions.toggleItem(product));
            }}
          />
        </div>
      </article>
    );
  },
);

ProductCard.displayName = 'ProductCard';
