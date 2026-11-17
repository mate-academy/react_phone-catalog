import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { request } from '../../utils/fetchResponse';
import { isCategory } from '../../utils/isCategory';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';

import { ToBack } from './ToBack';
import { ProductDetails } from './ProductDetails';
import { NotFoundProducts } from '../ProductsPage/NotFoundProducts';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SkeletonProduct } from '../../components/Skeletons/SkeletonProduct';
import { NotFoundPage } from '../../components/NotFoundPage';
import { ProductsSlider } from '../../components/Slider/ProductsSlider';

import { ProductDetailsData } from '../../types/ProductDetailsData';
import { Product } from '../../types/Product';

import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { category, productId } = useParams();
  const [product, setProduct] = useState<ProductDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const [suggested, setSuggested] = useState<Product[]>([]);
  const [isSuggestedLoading, setIsSuggestedLoading] = useState(true);
  const [hasSuggestedError, setHasSuggestedError] = useState(false);

  useEffect(() => {
    if (!isCategory(category)) {
      return;
    }

    setIsLoading(true);
    setHasError(false);

    request<ProductDetailsData[]>(`/${category}.json`)
      .then(data =>
        setProduct(data.find(prod => prod.id === productId) ?? null),
      )
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category, productId, reloadKey]);

  useEffect(() => {
    if (!product?.namespaceId || !productId) {
      return;
    }

    setIsSuggestedLoading(true);
    setHasSuggestedError(false);

    getSuggestedProducts(productId)
      .then(setSuggested)
      .catch(() => setHasSuggestedError(true))
      .finally(() => setIsSuggestedLoading(false));
  }, [product?.namespaceId, productId]);

  if (!isCategory(category)) {
    return <NotFoundPage />;
  }

  return (
    <section className={styles['product-details-page']}>
      <div className={styles['product-details-page__wrapper']}>
        <Breadcrumbs />

        <ToBack />

        {isLoading && <SkeletonProduct />}

        {hasError && (
          <NotFoundProducts
            title="Something went wrong"
            onReload={() => setReloadKey(key => key + 1)}
          />
        )}

        {!isLoading && !hasError && !product && (
          <NotFoundProducts title="Product was not found" />
        )}

        {!isLoading && !hasError && product && (
          <ProductDetails key={product.id} product={product} />
        )}

        <ProductsSlider
          isLoading={isSuggestedLoading}
          isError={hasSuggestedError}
          title="You may also like"
          products={suggested}
        />
      </div>
    </section>
  );
};
