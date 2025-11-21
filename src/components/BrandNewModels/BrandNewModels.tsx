// src/components/BrandNewModels/BrandNewModels.tsx
import React from 'react';
import Button from '../Button/Button';
import styles from './BrandNewModels.module.css';

export interface BrandNewModelsProps {
  className?: string;
  title?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  imageSrc?: string;
  imageAlt?: string;
  price?: string;
  specs?: {
    screen?: string;
    capacity?: string;
    ram?: string;
  };
  'data-testid'?: string;
  onButtonClick?: () => void;
  onFavouriteClick?: () => void;
  isFavourite?: boolean;
}

const BrandNewModels: React.FC<BrandNewModelsProps> = ({
  className = '',
  title,
  titleLevel = 3,
  imageSrc,
  imageAlt,
  price = 'R$ 999',
  specs,
  'data-testid': dataTestId = 'brand-new-model',
  onButtonClick,
  onFavouriteClick,
  isFavourite = false,
}) => {
  const Tag = `h${titleLevel}` as keyof JSX.IntrinsicElements;
  const imgSrc = imageSrc;

  return (
    <article
      className={`${styles.container} ${className}`.trim()}
      role="group"
      aria-label="Brand new model card"
      data-testid={dataTestId}
    >
      {/* imagem */}
      <div className={styles.containerImg} data-testid="brand-image-wrapper">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={imageAlt ?? title}
            className={styles.img}
            loading="lazy"
            data-testid="brand-image"
          />
        ) : (
          <div className={styles.imgPlaceholder} aria-hidden="true" />
        )}
      </div>

      {/* título */}
      <Tag className={styles.title} data-testid={`${dataTestId}-title`}>
        {title}
      </Tag>

      {/* preço */}
      <div
        className={styles.priceContainer}
        data-testid={`${dataTestId}-priceContainer`}
      >
        <p className={styles.price} data-testid={`${dataTestId}-price`}>
          {price}
        </p>
        <p className={styles.priceOff} data-testid={`${dataTestId}-priceOff`}>
          {price}
        </p>
      </div>

      {/* separador */}
      <div className={styles.separator} aria-hidden="true" />

      {/* specs */}
      <div
        className={styles.specRow}
        data-testid={`${dataTestId}-specs-screen`}
      >
        <span className={styles.specLabel}>Screen</span>
        <span className={styles.specValue}>{specs?.screen ?? '—'}</span>
      </div>

      <div
        className={styles.specRow}
        data-testid={`${dataTestId}-specs-capacity`}
      >
        <span className={styles.specLabel}>Capacity</span>
        <span className={styles.specValue}>{specs?.capacity ?? '—'}</span>
      </div>

      <div className={styles.specRow} data-testid={`${dataTestId}-specs-ram`}>
        <span className={styles.specLabel}>RAM</span>
        <span className={styles.specValue}>{specs?.ram ?? '—'}</span>
      </div>

      {/* botões */}
      <div className={styles.buttonRow}>
        <Button
          onClick={onButtonClick}
          variant="primary"
          size="md"
          className={styles.addButton}
          data-testid={`${dataTestId}-add-button`}
          ariaLabel="Add to cart"
        >
          Add to cart
        </Button>

        <button
          type="button"
          onClick={onFavouriteClick}
          className={styles.favButton}
          aria-label={
            isFavourite ? 'Remove from favourites' : 'Add to favourites'
          }
          aria-pressed={isFavourite ? 'true' : 'false'}
          data-testid={`${dataTestId}-fav-button`}
        />
      </div>
    </article>
  );
};

export default BrandNewModels;
export { BrandNewModels };
