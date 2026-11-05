import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { routePaths } from '@/app/router/routes';

import { AddToCartButton } from '@/features/add-to-cart';

import { useFavouritesStore } from '@/entities/favourites';
import { productApi } from '@/entities/product/product.api';
import { getProductSpecs } from '@/entities/product/lib/getProductSpecs';

import { FavouritesIcon, Typography } from '@/components/atoms';
import { DefaultButton, IconButton } from '@/components/molecules';

import { getProductColor } from '@/shared/constants/productColors';
import { useUsdToUahRate } from '@/shared/hooks/useUsdToUahRate';
import { animateProductToHeader } from '@/shared/lib/animateProductToHeader';
import { formatPrice } from '@/shared/lib/formatPrice';
import { useCurrencyStore } from '@/shared/store/useCurrencyStore';

import type { Accessory, Phone, Product, Tablet } from '@/shared/types';
import type { Category } from '@/shared/types/Category';

import styles from './ProductPurchase.module.scss';

type Props = {
  product: Product;
  productDetails: Phone | Tablet | Accessory;
  className?: string;
};

export const ProductPurchase = ({
  product,
  productDetails,
  className,
}: Props) => {
  const navigate = useNavigate();
  const { data: exchangeRate } = useUsdToUahRate();
  const currency = useCurrencyStore((state) => state.currency);

  const { t } = useTranslation();

  const isFavourite = useFavouritesStore((state) =>
    state.isFavourite(product.id),
  );
  const toggleFavourite = useFavouritesStore((state) => state.toggleFavourite);

  const [isChanging, setIsChanging] = useState(false);
  const specs = getProductSpecs(productDetails, t).slice(0, 4);

  const changeVariant = async (color: string, capacity: string) => {
    if (isChanging) return;

    if (
      color === productDetails.color &&
      capacity === productDetails.capacity
    ) {
      return;
    }

    setIsChanging(true);

    try {
      const variant = await productApi.getByVariant(
        product.category as Category,
        productDetails.namespace_id,
        color,
        capacity,
      );

      if (!variant) {
        throw new Error('Product variant not found');
      }

      navigate(routePaths.product(product.category, variant.id), {
        replace: true,
      });
    } catch (error) {
      throw new Error(`Failed to change product variant: ${error}`);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className={classNames(styles.itemBlock, className)}>
      <div className={styles.colors}>
        <span>{t('availableColors')}</span>
        <span className={styles.productId}>ID: {product.id}</span>
      </div>

      <div className={styles.colorOptions}>
        {productDetails.colors_available.sort().map((color) => (
          <button
            key={color}
            type="button"
            disabled={isChanging}
            className={classNames(styles.colorCircle, {
              [styles.selectedColor]: color === productDetails.color,
            })}
            style={{ backgroundColor: getProductColor(color) }}
            onClick={() => changeVariant(color, productDetails.capacity)}
            aria-label={t('selectColor', { color })}
            aria-pressed={color === productDetails.color}
          />
        ))}
      </div>

      <div className={styles.capacity}>
        <Typography
          variant="smalltext"
          as="span"
        >
          {t('selectCapacity')}
        </Typography>

        <div className={styles.capacityOptions}>
          {productDetails.capacity_available.map((capacity) => (
            <DefaultButton
              key={capacity}
              disabled={isChanging}
              className={classNames(styles.capacityButton, {
                [styles.selectedCapacity]: capacity === productDetails.capacity,
              })}
              onClick={() => changeVariant(productDetails.color, capacity)}
              aria-label={`Select ${capacity} capacity`}
            >
              <span className={styles.capacityText}>{capacity}</span>
            </DefaultButton>
          ))}
        </div>
      </div>

      <div className={styles.prices}>
        <Typography
          variant="h2"
          as="span"
          className={styles.currentPrice}
        >
          {formatPrice(product.price, exchangeRate, currency)}
        </Typography>

        <Typography
          variant="bodytext"
          as="span"
          className={styles.oldPrice}
        >
          <span className={styles.oldPriceValue}>
            {formatPrice(product.fullPrice, exchangeRate, currency)}
          </span>
        </Typography>
      </div>

      <div className={styles.actions}>
        <div className={styles.addToCart}>
          <AddToCartButton productId={product.id} />
        </div>

        <IconButton
          className={styles.favourite}
          selected={isFavourite}
          onClick={() => {
            if (!isFavourite) {
              animateProductToHeader(product.id, 'favourites');
            }

            toggleFavourite(product);
          }}
          iconInactive={<FavouritesIcon className={styles.favouriteIcon} />}
          iconActive={<FavouritesIcon filled />}
          aria-label={
            isFavourite ?
              `Remove ${product.name} from favourites`
            : `Add ${product.name} to favourites`
          }
        />
      </div>

      <div className={styles.specs}>
        {specs.map((spec) => (
          <div
            key={spec.specName}
            className={styles.specRow}
          >
            <Typography variant="smalltext">{spec.specName}</Typography>

            <Typography variant="smalltext">{spec.specText}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
