import React from 'react';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductSlider } from '../shared/components/ProductSlider';
import { ProductActions } from './components/ProductActions';
import { ProductGallery } from './components/ProductGallery';
import { ProductAbout } from './components/ProductAbout';
import { TechSpecs } from '../shared/components/TechSpecs';
import { PageTitle } from '../shared/components/PageTitle';
import { BackButton } from '../shared/components/BackButton';
import { useProductDetailsPage } from './useProductDetailsPage';
import { Loader } from '../shared/components/Loader';

export const ProductDetailsPage: React.FC = () => {
  const { product, baseProduct, suggestedProducts, loading } =
    useProductDetailsPage();

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <BackButton />

      <div className={styles.product}>
        <PageTitle>{product.name}</PageTitle>

        <div className={styles.productMain}>
          <ProductGallery images={product.images} />
          <ProductActions product={product} baseId={baseProduct?.id} />
        </div>

        <div className={styles.productDetails}>
          <ProductAbout description={product.description} />

          <div className={styles.productTechSpecs}>
            <h2>Tech specs</h2>
            <TechSpecs product={product} variant="full" />
          </div>
        </div>
      </div>

      <div className={styles.productSuggestions}>
        <ProductSlider title="You may also like" products={suggestedProducts} />
      </div>
    </div>
  );
};
