import { Button } from '../../../../components/Button';
import { ColorButton } from '../../../../components/ColorButton';
import { IconButton } from '../../../../components/IconButton';
import { useTranslation } from '../../../../hooks';
import type { ProductDetailsFromServer } from '../../../../types/product';
import { normalizeProductOption } from '../../../../utils';
import { ProductShortSpecs } from '../ProductShortSpecs';
import styles from '../../ProductDetailsPage.module.scss';

type Props = {
  product: ProductDetailsFromServer;
  productId?: number;
  isBrandNew?: boolean;
  isInCart: boolean;
  isFavorite: boolean;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
  onAddToCart: () => void;
  onToggleFavorite: () => void;
};

export const ProductPurchasePanel = ({
  product,
  productId,
  isBrandNew = false,
  isInCart,
  isFavorite,
  onColorChange,
  onCapacityChange,
  onAddToCart,
  onToggleFavorite,
}: Props) => {
  const t = useTranslation();

  const visiblePrice = isBrandNew
    ? product.priceRegular
    : product.priceDiscount;

  const shouldShowRegularPrice = !isBrandNew;

  return (
    <div className={styles.info}>
      <div className={styles.optionBlock}>
        <div className={styles.optionHeader}>
          <p className={styles.optionTitle}>
            {t.productDetails.availableColors}
          </p>

          <span className={styles.productId}>ID: {productId}</span>
        </div>

        <div className={styles.colorList}>
          {product.colorsAvailable.map(color => (
            <ColorButton
              color={color}
              label={`${t.productDetails.availableColors}: ${color}`}
              isSelected={
                normalizeProductOption(color) ===
                normalizeProductOption(product.color)
              }
              key={color}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.optionBlock}>
        <p className={styles.optionTitle}>{t.productDetails.selectCapacity}</p>

        <div className={styles.capacityList}>
          {product.capacityAvailable.map(capacity => {
            const isSelected =
              normalizeProductOption(capacity) ===
              normalizeProductOption(product.capacity);

            return (
              <button
                className={
                  isSelected
                    ? `${styles.capacityButton} ${styles.capacityButtonActive}`
                    : styles.capacityButton
                }
                type="button"
                aria-pressed={isSelected}
                aria-label={`${t.productDetails.selectCapacity}: ${capacity}`}
                key={capacity}
                onClick={() => onCapacityChange(capacity)}
              >
                {capacity}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.price}>
        <span className={styles.priceDiscount}>${visiblePrice}</span>

        {shouldShowRegularPrice && (
          <span className={styles.priceRegular}>${product.priceRegular}</span>
        )}
      </div>

      <div className={styles.actions}>
        <Button
          fullWidth
          className={styles.cartButton}
          isSelected={isInCart}
          onClick={onAddToCart}
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
          onClick={onToggleFavorite}
        />
      </div>

      <ProductShortSpecs product={product} />
    </div>
  );
};
