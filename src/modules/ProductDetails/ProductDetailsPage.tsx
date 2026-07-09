import React from 'react';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductSlider } from '../shared/components/ProductSlider';
import { ProductActions } from './components/ProductActions';
import { ProductGallery } from './components/ProductGallery';
import { ProductAbout } from './components/ProductAbout';
import { TechSpecs } from '../shared/components/TechSpecs';
import { BackButton } from '../shared/components/BackButton';
import { useProductDetailsPage } from './useProductDetailsPage';
import { Loader } from '../shared/components/Loader';
import { ProductNotFound } from './components/ProductNotFound/ProductNotFound';
import { useTitle } from '../../hooks/useTitle';

export const ProductDetailsPage: React.FC = () => {
  const { product, baseProduct, suggestedProducts, loading } =
    useProductDetailsPage();

  useTitle(product ? product.name : 'Product not found');

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <BackButton />

      <div>
        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.productMain}>
          <ProductGallery images={product.images} />
          <ProductActions product={product} baseId={baseProduct?.id} />
        </div>

        <div className={styles.productDetails}>
          <ProductAbout description={product.description} />

          <div>
            <h2 className={styles.techSpecsTitle}>Tech specs</h2>
            <TechSpecs product={product} variant="full" />
          </div>
        </div>
      </div>

      <ProductSlider title="You may also like" products={suggestedProducts} />
    </div>
  );
};
