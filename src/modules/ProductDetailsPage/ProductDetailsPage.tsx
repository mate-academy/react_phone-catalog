import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProductDetails } from './hooks/useProductDetails';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ProductGallery } from './components/ProductGallery';
import { ProductInfo } from './components/ProductInfo';
import { SuggestedProducts } from './components/SuggestedProducts';
import styles from './ProductDetails.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId?: string }>();

  const { product, loading, error } = useProductDetails(productId || '');

  if (!productId) {
    return <Navigate to="/404" replace />;
  }

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className={styles.productDetailsPage}>
      <Breadcrumbs product={product} />
      <div className={styles.productDetailsPage__main}>
        <ProductGallery images={product.image} name={product.name} />
        <ProductInfo product={product} />
      </div>
      <SuggestedProducts currentProductId={product.id} />
    </div>
  );
};
