// ProductOverview.tsx
import { ProductGallery } from '../ProductGallery/ProductGallery';
import styles from './ProductOverview.module.scss';
import type { ProductDetails } from '../../../../types/ProductDetails';
import { RightColumn } from '../RightColumn/RightColumn';
import { About } from '../About/About';
import { TechSpecs } from '../TechSpecs/TechSpecs';

interface ProductOverviewProps {
  product: ProductDetails;
  category: string;
}

export const ProductOverview = ({
  product,
  category,
}: ProductOverviewProps) => {
  return (
    <section className={styles.productOverviewProps}>
      <h1 className={`section-title-h1-product-detailis mb-32-40`}>
        {product?.name}
      </h1>
      <div className={styles.galleryBlock}>
        <div className={styles.galleryWrapper}>
          <ProductGallery images={product?.images} />
        </div>
        <div className={styles.detailsWrapper}>
          <RightColumn product={product} category={category} />
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.galleryWrapper}>
          <About description={product?.description} />
        </div>
        <div className={styles.detailsWrapper}>
          <TechSpecs product={product} />
        </div>
      </div>
    </section>
  );
};
