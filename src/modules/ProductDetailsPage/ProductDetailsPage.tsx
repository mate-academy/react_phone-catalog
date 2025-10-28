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
  const { product, loading, error, debugInfo } = useProductDetails(
    productId || '',
  );

  if (!productId) {
    return <Navigate to="/404" replace />;
  }

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return (
      <div className={styles.errorPage}>
        <h2>Product Not Found</h2>
        <p>Error: {error}</p>
        {debugInfo && (
          <div className={styles.debugInfo}>
            <p>Total products in database: {debugInfo.totalProducts}</p>
            <p>Found by ID: {debugInfo.foundById ? 'Yes' : 'No'}</p>
            <p>Found by Phone ID: {debugInfo.foundByPhoneId ? 'Yes' : 'No'}</p>
            <p>Found by Item ID: {debugInfo.foundByItemId ? 'Yes' : 'No'}</p>
            <p>Product ID from URL: {productId}</p>
          </div>
        )}
        <Navigate to="/404" replace />
      </div>
    );
  }

  const galleryImages = product.images || [product.image];

  return (
    <div className={styles.productDetailsPage}>
      <Breadcrumbs product={product} />
      <div className={styles.productDetailsPage__main}>
        <ProductGallery
          images={galleryImages}
          name={product.name}
          category={product.category}
        />
        <ProductInfo product={product} />
      </div>
      <SuggestedProducts currentProductId={product.id} />
    </div>
  );
};
