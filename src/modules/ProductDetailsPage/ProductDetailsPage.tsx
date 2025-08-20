/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductDetailsSkeleton } from './components/Skeleton';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { BackButton } from '../../shared/components/BackButton';
import { SuggestedProductsCarousel } from './components/SuggestedProductsCarousel';
import { NotFoundPage } from '../NotFoundPage';
import { ImageGallery } from './components/ImageGallery';
import { ProductSpecs } from './components/ProductSpecs';
import { FullProductDetails } from '../../types/Product/FullProductDetails';
import { ProductDescription } from './components/ProductDescription';
import { ProductForCard } from '../../types/Product/Product';
import {
  fetchRandomSuggestions,
  loadProductBundleById,
} from '../../shared/api/ProductFetching';

import styles from './ProductDetailsPage.module.scss';
import { capitalizeFirstLetter } from '../../shared/utils/capitalizeFirstLetter';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{
    productId: string;
  }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<FullProductDetails | null>(null);
  const [variants, setVariants] = useState<FullProductDetails[]>([]);
  const [productNumericId, setProductNumericId] = useState<number>(0);
  const [colors, setColors] = useState<string[]>([]);
  const [capacities, setCapacities] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<ProductForCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) {
        setError('Invalid product URL');
        setLoading(false);

        return;
      }

      if (initialLoad) {
        setLoading(true);
      }

      try {
        setError(null);

        const productBundle = await loadProductBundleById(productId);

        setProduct(productBundle.product);
        setVariants(productBundle.variants);
        setColors(productBundle.colors);
        setCapacities(productBundle.capacities);
        setProductNumericId(productBundle.numericId);

        const suggestedProducts = await fetchRandomSuggestions(
          productBundle.product.category,
          productBundle.product.namespaceId,
        );

        setSuggestions(suggestedProducts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failer to fetch the product',
        );
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchProductData();
  }, [productId, initialLoad]);

  const handleColorChange = (color: string) => {
    const selected = variants.find(
      v => v.color === color && v.capacity === product?.capacity,
    );

    if (selected) {
      setProduct(selected);

      setTimeout(() => {
        navigate(`/product/${selected.id}`, { replace: true });
      }, 100);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    const selected = variants.find(
      v => v.capacity === capacity && v.color === product?.color,
    );

    if (selected) {
      setProduct(selected);

      setTimeout(() => {
        navigate(`/product/${selected.id}`, { replace: true });
      }, 100);
    }
  };

  if (loading) {
    return (
      <div className={styles.productDetails}>
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.productDetails}>
        <div className={styles.productDetails__error}>Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return <NotFoundPage />;
  }

  const breadcrumbs = [
    {
      name: capitalizeFirstLetter(product.category),
      path: `/${product.category}`,
    },
    {
      name: product.name,
      path: '',
    },
  ];

  return (
    <div className={styles.productDetails}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <BackButton />

      <div className={styles.productDetails__productContainer}>
        <div className={styles.productDetails__mainDisplay}>
          <h1 className={styles.productDetails__title}>{product.name}</h1>

          <div className={styles.productDetails__imageSection}>
            <ImageGallery images={product.images} />
          </div>

          <div className={styles.productDetails__specsSection}>
            <ProductSpecs
              product={product}
              productNumericId={productNumericId}
              colors={colors}
              capacities={capacities}
              camera={product.camera}
              onColorChange={handleColorChange}
              onCapacityChange={handleCapacityChange}
            />
          </div>
        </div>

        <div className={styles.productDetails__descriptionSection}>
          <ProductDescription
            description={product.description}
            specs={{
              screen: product.screen,
              resolution: product.resolution,
              processor: product.processor,
              ram: product.ram,
              memory: product.capacity,
              camera: product.camera,
              zoom: product.zoom,
              cell: product.cell,
            }}
          />
        </div>

        <div className={styles.productDetails__suggestionSection}>
          <SuggestedProductsCarousel
            products={suggestions}
            title="You may also like"
          />
        </div>
      </div>
    </div>
  );
};
