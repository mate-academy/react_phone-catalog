import React, { memo, useEffect, useState } from 'react';
import BreadCrumbs from '../../components/UI/BreadCrumbs';
import BackButton from '../../components/UI/BackButton';
import { useAppParams } from '../../enhancers/hooks/appParams';
import { getProductById } from '../../api/products';
import { Product } from '../../definitions/types/Product';
import ProductDetails from '../../components/common/ProductDetails';

export const ProductPage: React.FC = memo(() => {
  const { productId, category } = useAppParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProductById(category, productId).then(setProduct);
  }, []);

  return (
    <div className="products-page">
      <BreadCrumbs />

      <BackButton />

      <ProductDetails product={product} />

    </div>
  );
});
