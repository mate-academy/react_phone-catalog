import type { FC } from 'react';

import type { DetailedProduct } from '../../../types/detailedProduct';

import { TechSpecsSection } from '../TechSpecsSection';
import { AboutSection } from '../AboutSection';

import styles from './ProductDescriptionSection.module.scss';

interface ProductDescriptionSectionProps {
  product: DetailedProduct;
}

export const ProductDescriptionSection: FC<ProductDescriptionSectionProps> = ({
  product,
}) => {
  return (
    <section className={styles.productDescriptionSection}>
      <AboutSection description={product.description} />
      <TechSpecsSection
        screen={product.screen}
        resolution={product.resolution}
        processor={product.processor}
        ram={product.ram}
        capacity={product.capacity}
        camera={product.camera}
        zoom={product.zoom}
        cell={product.cell}
      />
    </section>
  );
};
