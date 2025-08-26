// ProductDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ProductGallery } from './components/ProductGallery';
import { ProductInfo } from './components/ProductInfo';
import { ProductAbout } from './components/ProductAbout';
import { ProductSpecs } from './components/ProductSpecs';
import { ProductsSlider } from '../../component/ProductsSlider/ProductsSlider';
import { getSuggestedProducts } from '../../api/productsApi';

import { useFullProductById } from '../../hooks/useFullProductById';

import styles from './ProductDetailsPage.module.scss';
import { Product } from '../../types/Product';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const {
    product,
    loading: productLoading,
    error: productError,
  } = useFullProductById(productId);

  const [suggested, setSuggested] = useState<Product[]>([]);

  useEffect(() => {
    getSuggestedProducts().then(setSuggested);
  }, []);

  if (productLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (!product || productError) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs category={product.category} productName={product.name} />

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.mainSection}>
        <ProductGallery images={product.images || []} />
        <ProductInfo product={product} />
      </div>

      <div className={styles.detailsSection}>
        <ProductAbout description={product.description} />
        <ProductSpecs product={product} />
      </div>

      <div className={styles.sliderSection}>
        <ProductsSlider products={suggested} title={'You may also like'} />
      </div>
    </div>
  );
};
