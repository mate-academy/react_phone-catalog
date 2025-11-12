import React from 'react';
import { useParams, Navigate, useLocation, Link } from 'react-router-dom';
import { useProductDetails } from './hooks/useProductDetails';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ProductGallery } from './components/ProductGallery';
import { ProductInfo } from './components/ProductInfo';
import { SuggestedProducts } from './components/SuggestedProducts';
import styles from './ProductDetails.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId?: string }>();
  const location = useLocation();
  const shouldShowDiscount = !!location.state as boolean | undefined;

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

  // Technical specifications
  const techSpecs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    {
      label: 'Cell',
      value: product.cell
        ? Array.isArray(product.cell)
          ? product.cell.join(', ')
          : product.cell
        : undefined,
    },
  ].filter(spec => spec.value);

  return (
    <div className={styles.productDetailsPage}>
      <Breadcrumbs product={product} />

      {/* Link de regreso */}
      <Link to={-1} className={styles.backLink}>
        <img src={'img/icons/icon-left.png'} alt="Back" />
        Back
      </Link>

      {/* ProductInfo */}
      <h1 className={styles.productDetailsPage__title}>{product.name}</h1>

      <div className={styles.productDetailsPage__topSection}>
        <ProductGallery
          images={galleryImages}
          name={product.name}
          category={product.category}
        />
        <ProductInfo product={product} showDiscount={shouldShowDiscount} />
      </div>

      {/* About + Tech Specs */}
      <div className={styles.productDetailsPage__bottomSection}>
        {/* About */}
        {product.description && product.description.length > 0 && (
          <div className={styles.productAbout}>
            <h3 className={styles.productAbout__title}>About</h3>
            <div className={styles.productAbout__content}>
              {product.description.map((section, index) => (
                <div key={index} className={styles.productAbout__section}>
                  {section.title && (
                    <h4 className={styles.productAbout__sectionTitle}>
                      {section.title}
                    </h4>
                  )}
                  {section.text.map((paragraph, pIndex) => (
                    <p key={pIndex} className={styles.productAbout__paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Specs */}
        {techSpecs.length > 0 && (
          <div className={styles.productTechSpecs}>
            <h3 className={styles.productTechSpecs__title}>Tech specs</h3>
            <div className={styles.productTechSpecs__list}>
              {techSpecs.map((spec, index) => (
                <div key={index} className={styles.productTechSpecs__item}>
                  <span className={styles.productTechSpecs__label}>
                    {spec.label}
                  </span>
                  <span className={styles.productTechSpecs__value}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggested */}
      <SuggestedProducts currentProductId={product.id} />
    </div>
  );
};
