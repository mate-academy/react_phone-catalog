import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { ProductSlider } from '../shared/components/ProductSlider';
import { ContextProps } from '../../types/ContextProps';
import { getProductById } from '../shared/services/productService';
import { ProductDetails } from '../../types/ProductDetails';
import { ArrowUpIcon } from '../shared/components/Icons';
import { ProductActions } from './components/ProductActions';
import { ProductGallery } from './components/ProductGallery';
import { ProductAbout } from './components/ProductAbout';
import { TechSpecs } from '../shared/components/TechSpecs';

export const ProductDetailsPage: React.FC = () => {
  const { products } = useOutletContext<ContextProps>();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    getProductById(productId)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [productId]);

  const baseProduct = products.find(p => p.itemId === productId);

  if (loading) {
    return (
      <div className={styles.container}>
        <h2>Loading...</h2>
      </div>
    );
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

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <span className="icon icon--left">
          <ArrowUpIcon />
        </span>
        Back
      </button>
      <div className={styles.product}>
        <h1 className={styles.title}>{product.name}</h1>
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
        <ProductSlider title="You may also like" products={products} />
      </div>
    </div>
  );
};
