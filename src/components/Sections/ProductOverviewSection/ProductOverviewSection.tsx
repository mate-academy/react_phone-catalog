import type { FC } from 'react';

import { ProductGallerySection } from '../ProductGallerySection';
import { ProductActionsSection } from '../ProductActionsSection';

import styles from './ProductOverviewSection.module.scss';
import type { DetailedProduct } from '../../../types/detailedProduct';

interface ProductOverviewSectionProps {
  product: DetailedProduct;
  selectedColor: string | null;
  selectedCapacity: string | null;
  onOptionChange: (newColor: string, newCapacity: string) => void;
}

export const ProductOverviewSection: FC<ProductOverviewSectionProps> = ({
  product,
  selectedColor,
  selectedCapacity,
  onOptionChange,
}) => {
  return (
    <section className={styles.productOverviewSection}>
      <ProductGallerySection
        images={product.images}
        productName={product.name}
      />
      <ProductActionsSection
        product={product}
        selectedColor={selectedColor}
        selectedCapacity={selectedCapacity}
        onOptionChange={onOptionChange}
      />
    </section>
  );
};
