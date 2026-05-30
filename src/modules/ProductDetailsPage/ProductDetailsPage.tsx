import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails, getSuggestedProducts } from '@/api/api';
import styles from './ProductDetailsPage.module.scss';
import { ProductDetail } from '@/types/ProductDetail';
import { Product } from '@/types/Product';
import { ProductGallery } from './components/ProductGallery';
import { ProductActions } from './components/ProductActions';
import { Breadcrumbs } from '@/modules/shared/ui/Breadcrumbs';
import { Heading } from '@/modules/shared/ui/Heading';
import { ProductDescription } from './components/ProductDescription';
import { ProductSlider } from '../shared/components/ProductSlider';
import { ProductDetailsSkeleton } from '@/components/ProductDetailsSkeleton';
import { BackButton } from '@/modules/CartPage/components/BackButton';
import { EmptyState } from '../shared/components/EmptyState';
import notFoundImg from '@/assets/img/ProductNotFound.png';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  // --- EFFECT: FETCH PRODUCT DETAILS ---
  // Runs every time the productId changes (e.g., when clicking a suggested product)
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
          setErrorMessage('empty.product.title');
          setProduct(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productId]);

  // --- EFFECT: FETCH SUGGESTIONS ---
  // Fetches a list of related products to display in the bottom slider
  useEffect(() => {
    if (productId) {
      getSuggestedProducts(productId).then(setSuggestedProducts);
    }
  }, [productId]);

  // --- LOADING STATE ---
  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  // --- ERROR / NOT FOUND STATE ---
  if (errorMessage || !product) {
    return (
      <div className={styles.container}>
        <BackButton />
        <EmptyState
          title="empty.product.title"
          text="empty.product.text"
          imgUrl={notFoundImg}
          showCategories={true}
        />
      </div>
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

      <ProductSlider products={suggestedProducts} title="catalog.likesSlider" />
    </div>
  );
};
