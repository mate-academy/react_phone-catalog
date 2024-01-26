import React, { memo, useCallback, useEffect, useRef } from 'react';
import BreadCrumbs from '../../components/UI/BreadCrumbs';
import BackButton from '../../components/UI/BackButton';
import { useAppParams } from '../../enhancers/hooks/appParams';
import { getProductById, getSimilarProducts } from '../../api/products';
import ProductDetailsComponent from '../../components/common/ProductDetailsComponent';
import { useRequest } from '../../enhancers/hooks/request';
import ErrorMessage from '../../components/common/ErrorMessage';
import { ProductDetails } from '../../definitions/types/ProductDetails';
import { useNavigate } from 'react-router-dom';

export const ProductPage: React.FC = memo(() => {
  const { productId, category } = useAppParams();
  const navigate = useNavigate();
  const [product, loading, error, setProduct] = useRequest(
    () => getProductById(category, productId),
  );
  const similarProducts = useRef<ProductDetails[]>([]);

  const changeProduct = useCallback((color: string, capacity: string) => {
    const productToChange = similarProducts.current.find(currentProduct => (
      currentProduct.color === color && currentProduct.capacity === capacity
      ));
      
      if (productToChange) {
        navigate(`/${category}/${productToChange.id}`);
        setProduct(productToChange);
    }
  }, [similarProducts])

  useEffect(() => {
    if (product) {
      getSimilarProducts(category, product).then((products) => {
        similarProducts.current = products;
      })
    }
  }, [product?.namespaceId]);


  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="product-page">
      <BreadCrumbs />

      <BackButton />

      {loading || !product
        ? <ProductDetailsComponent loading />
        : <ProductDetailsComponent product={product} changeProduct={changeProduct}/>
      }

    </div>
  );
});
