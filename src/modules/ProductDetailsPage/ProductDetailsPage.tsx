import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails, getSuggestedProducts } from '@/api/api';
import styles from './ProductDetailsPage.module.scss';
import { ProductDetail } from '@/types/ProductDetail';
import { Product } from '@/types/Product';
import { ProductGallery } from './components/ProductGallery';
import { ProductActions } from './components/ProductActions';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Heading } from '@/components/ui/Heading';
import { ProductDescription } from './components/ProductDescription';
import { ProductSlider } from '../shared/components/ProductSlider';
import { ProductDetailsSkeleton } from '@/components/ProductDetailsSkeleton';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setErrorMessage('');

    if (productId) {
      getProductDetails(productId)
        .then(data => {
          setProduct(data);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          setErrorMessage('Product not found');
          setProduct(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      getSuggestedProducts(productId).then(setSuggestedProducts);
    }
  }, [productId]);

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (errorMessage || !product) {
    return (
      <h1 className={styles.error}>{errorMessage || 'Product not found'}</h1>
    );
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs category={product.category} productName={product.name} />

      <Heading as="h2" className={styles.page__heading}>
        {product.name}
      </Heading>

      <div className={styles.productContent}>
        <div className={styles.galleryWrapper}>
          <ProductGallery images={product.images} name={product.name} />
        </div>

        <div className={styles.actionsWrapper}>
          <ProductActions product={product} />
        </div>
      </div>

      {product && (
        <div className={styles.descriptionWrapper}>
          <ProductDescription product={product} />
        </div>
      )}

      <ProductSlider products={suggestedProducts} title="You may also like" />
    </div>
  );
};
