import React, { memo } from 'react';
import BreadCrumbs from '../../components/UI/BreadCrumbs';
import BackButton from '../../components/UI/BackButton';
import { useAppParams } from '../../enhancers/hooks/appParams';
import { getProductById } from '../../api/products';
import ProductDetailsComponent from '../../components/common/ProductDetailsComponent';
import { useRequest } from '../../enhancers/hooks/request';
import ErrorMessage from '../../components/common/ErrorMessage';
import { ProductDetails } from '../../definitions/types/ProductDetails';

export const ProductPage: React.FC = memo(() => {
  const { productId, category } = useAppParams();
  const [product, loading, error] = useRequest<ProductDetails>(
    () => getProductById(category, productId)
  );

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="product-page">
      <BreadCrumbs />

      <BackButton />

      <ProductDetailsComponent product={product} loading={loading} />

    </div>
  );
});
