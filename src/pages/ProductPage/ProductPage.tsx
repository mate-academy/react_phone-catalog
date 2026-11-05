import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ProductLoadingSkeleton } from '@/components';
import { ProductTemplate } from '@/components/templates';

import {
  useProduct,
  useProductByIdInCategory,
} from '@/entities/product/model/product.queries';

import type { Category } from '@/shared/types/Category';

import { NotFoundProductPage } from '../NotFoundProductPage';

export const ProductPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  const { t } = useTranslation();

  const { catalogSlug, productSlug } = useParams<
    'catalogSlug' | 'productSlug'
  >();

  const {
    data: product,
    isPending: isProductPending,
    isError: isProductError,
  } = useProduct(productSlug ?? '');

  const {
    data: productDetails,
    isPending: isDetailsPending,
    isError: isDetailsError,
  } = useProductByIdInCategory(
    product?.category as Category | undefined,
    product?.item_id,
  );

  useEffect(() => {
    document.title = `${productDetails?.name || t('loading')} | NICE GADGETS`;
  }, [productDetails, t]);

  if (isProductPending) return <ProductLoadingSkeleton />;
  if (!product || isProductError || product.category !== catalogSlug) {
    return <NotFoundProductPage />;
  }

  if (isDetailsPending) return <ProductLoadingSkeleton />;
  if (!productDetails || isDetailsError) return <NotFoundProductPage />;

  return (
    <ProductTemplate
      product={product}
      productDetails={productDetails}
    />
  );
};
