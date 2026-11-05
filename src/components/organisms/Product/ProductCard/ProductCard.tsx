import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';

import { FavouritesIcon, Typography } from '@/components/atoms';
import { IconButton, Rating } from '@/components/molecules';

import { useFavouritesStore } from '@/entities/favourites';
import type { ProductRating } from '@/entities/product/api/product-ratings.api';

import { AddToCartButton } from '@/features';

import { useUsdToUahRate } from '@/shared/hooks/useUsdToUahRate';
import { animateProductToHeader } from '@/shared/lib/animateProductToHeader';
import { formatPrice } from '@/shared/lib/formatPrice';
import { useCurrencyStore } from '@/shared/store/useCurrencyStore';
import type { Product, Rate } from '@/shared/types';

import { ImageWithFallback } from '../../ImageWithFallback';
import { ProductLink } from '../ProductLink';
import { Spec } from './Spec';

import memoryIcon from '@/shared/assets/icons/Memory.svg';
import ramIcon from '@/shared/assets/icons/Ram.svg';
import screenIcon from '@/shared/assets/icons/Screen.svg';

import 'react-loading-skeleton/dist/skeleton.css';
import styles from './ProductCard.module.scss';

type Props = {
  product?: Product;
  isLoading?: boolean;
  rating?: ProductRating;
  className?: string;
};

export const ProductCard = ({
  product,
  isLoading,
  rating,
  className,
}: Props) => {
  const { t } = useTranslation();
  const { data: exchangeRate } = useUsdToUahRate();
  const currency = useCurrencyStore((state) => state.currency);

  const cardId = product?.id ?? 0;

  const isFavourite = useFavouritesStore((state) => state.isFavourite(cardId));

  const toggleFavourite = useFavouritesStore((state) => state.toggleFavourite);

  if (isLoading || !product) {
    return (
      <article
        className={classNames(styles.card, className)}
        aria-busy="true"
        aria-label={t('loadingProduct')}
      >
        <div className={styles.ratingBadge}>
          <Skeleton
            width={76}
            height={18}
          />
        </div>

        <Skeleton className={styles.image} />

        <Skeleton
          className={styles.title}
          height={20}
        />

        <div className={styles.prices}>
          <Skeleton
            width={80}
            height={24}
          />
        </div>

        <div className={styles.specs}>
          {Array.from({ length: 3 }, (_, index) => (
            <div
              className={styles.specRow}
              key={index}
            >
              <Skeleton width={48} />
              <Skeleton width={64} />
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Skeleton
            width={160}
            height={40}
          />
          <Skeleton
            width={40}
            height={40}
          />
        </div>
      </article>
    );
  }

  const specs = [
    { label: 'Screen', value: product.screen, icon: screenIcon },
    { label: 'Memory', value: product.capacity, icon: memoryIcon },
    { label: 'Ram', value: product.ram, icon: ramIcon },
  ];

  const roundedRating =
    rating ? (Math.max(0, Math.min(5, Math.round(rating.rating))) as Rate) : 0;

  return (
    <article className={classNames(styles.card, styles.loaded, className)}>
      {rating && rating.reviewsCount > 0 && (
        <div
          className={styles.ratingBadge}
          aria-label={`Rated ${rating.rating.toFixed(1)} out of 5 from ${rating.reviewsCount} reviews`}
        >
          <Rating
            rate={roundedRating}
            className={styles.ratingStars}
          />

          <span className={styles.ratingValue}>{rating.rating.toFixed(1)}</span>

          <span className={styles.reviewsCount}>({rating.reviewsCount})</span>
        </div>
      )}

      <ProductLink
        category={product.category}
        itemId={product.item_id}
      >
        <ImageWithFallback
          className={styles.image}
          data-product-image={product.id}
          src={product.imageUrls?.[0] || product.images[0]}
          alt={product.name}
        />
      </ProductLink>

      <Typography
        variant="bodytext"
        as="h3"
        className={styles.title}
      >
        <ProductLink
          category={product.category}
          itemId={product.item_id}
        >
          {product.name}
        </ProductLink>
      </Typography>

      <div className={styles.prices}>
        <Typography
          variant="h3"
          as="span"
        >
          {formatPrice(product.price, exchangeRate, currency)}
        </Typography>

        {product.fullPrice && (
          <Typography
            variant="bodytext"
            as="span"
            className={styles.oldPrice}
          >
            <span className={styles.oldPriceValue}>
              {formatPrice(product.fullPrice, exchangeRate, currency)}
            </span>
          </Typography>
        )}
      </div>

      <div className={styles.specs}>
        {specs.map(({ label, value, icon }) => {
          return (
            <Spec
              label={label}
              value={value}
              icon={icon}
              key={label}
            />
          );
        })}
      </div>

      <div className={styles.actions}>
        <AddToCartButton productId={product.id} />

        <IconButton
          className={styles.favourite}
          selected={isFavourite}
          iconInactive={<FavouritesIcon className={styles.favouriteIcon} />}
          iconActive={<FavouritesIcon filled />}
          onClick={() => {
            if (!isFavourite) {
              animateProductToHeader(product.id, 'favourites');
            }

            toggleFavourite(product);
          }}
          aria-label={
            isFavourite ?
              `Remove ${product.name} from favourites`
            : `Add ${product.name} to favourites`
          }
        />
      </div>
    </article>
  );
};
