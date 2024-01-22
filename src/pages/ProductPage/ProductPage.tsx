import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../UI/BreadCrumbs';
import BackButton from '../../UI/BackButton';
import { useAppParams } from '../../hooks/appParams';
import { getProductById } from '../../api/products';
import { Product } from '../../types/Product';
import ProductDetails from '../../components/ProductDetails';

export const ProductPage: React.FC = memo(() => {
  const { productId, category } = useAppParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isWrongCategory, setIsWrongCategory] = useState(false);

  console.log(isWrongCategory);

  useEffect(() => {
    getProductById(productId).then((productFromServer) => {
      console.log(productFromServer);
      if (productFromServer.category !== category) {
        setIsWrongCategory(true);
      }

      setProduct(productFromServer);
    });
  }, []);

  return (
    <div className="products-page">
      <BreadCrumbs />

      <BackButton />

      {isWrongCategory
        ? (
          <div>
            Is Wrong url, maybe you looking for
            <Link to={`/${product?.category}/${productId}`}>{product?.name}</Link>
          </div>
        )
        : <ProductDetails product={product} />}

    </div>
  );
});
