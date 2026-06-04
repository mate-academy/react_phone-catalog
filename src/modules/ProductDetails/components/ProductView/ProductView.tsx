import React from 'react';

import styles from './ProductView.module.scss';

import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import { ColorPicker } from '../ColorPicker';
import { CapacityPicker } from '../CapacityPicker';
import { ProductDetailsType } from '../../../../types/product-details.types';
import { ImageGallery } from '../ImageGallery';
import { TechSpecs } from '../TechSpecs';
import { AboutSection } from '../AboutSection';
import { ProductActions } from '../../../../components/ProductActions';
import { BackButton } from '../../../../components/BackButton';
import classNames from 'classnames';

interface ProductViewProps {
  details: ProductDetailsType;
  isLoading?: boolean;
  className?: string;
}

const getNewPath = (
  details: ProductDetailsType,
  newColor?: string,
  newCapacity?: string,
) => {
  if (!details) {
    return '';
  }

  const color = newColor || details.color;
  const capacity = (newCapacity || details.capacity).toLowerCase();

  return `/products/${details.namespaceId}-${capacity}-${color.replace(/\s+/g, '-')}`;
};

export const ProductView: React.FC<ProductViewProps> = ({
  details,
  isLoading,
  className,
}) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.loading]: isLoading,
      })}
    >
      <nav>
        <Breadcrumbs />
      </nav>

      <BackButton />

      <h2 className={styles.title}>{details.name}</h2>

      <div className={styles.productDetails}>
        <div className={styles.productPageHero}>
          <div className={styles.imageGallery}>
            <ImageGallery
              className={styles.imageGallery}
              details={details}
              isLoading={isLoading}
            />
          </div>

          <section className={styles.selectionBlock}>
            <ColorPicker
              colors={details.colorsAvailable}
              currentColor={details.color}
              getNewPath={color => getNewPath(details, color, undefined)}
              itemId={details.id}
              disabled={!!isLoading}
            />

            <div className={styles.divider}></div>

            <CapacityPicker
              className={styles.capacityAvailable}
              capacity={details.capacityAvailable}
              currentCapacity={details.capacity}
              getNewPath={capacity => getNewPath(details, undefined, capacity)}
              disabled={!!isLoading}
            />

            <div className={styles.divider}></div>

            <div className={styles.priceContainer}>
              <p className={styles.newPrice}>{details.priceDiscount}</p>
              <p className={styles.oldPrice}>{details.priceRegular}</p>
            </div>

            <ProductActions
              className={styles.productActions}
              product={details}
            />

            <div className={styles.technicalInformation}>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Screen:</span>
                <span className={styles.specValue}>{details.screen}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Resolution:</span>
                <span className={styles.specValue}>{details.resolution}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Processor:</span>
                <span className={styles.specValue}>{details.processor}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>RAM:</span>
                <span className={styles.specValue}>{details.ram}</span>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.description}>
          <AboutSection
            className={classNames(styles.aboutSection, className)}
            details={details}
          />
          <TechSpecs
            className={classNames(styles.techSpecs, className)}
            details={details}
          />
        </div>
      </div>
    </div>
  );
};
